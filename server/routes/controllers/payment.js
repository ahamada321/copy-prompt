const { normalizeErrors } = require("./helpers/mongoose");
const Payment = require("./models/payment");
const Prompt = require("./models/prompt");
const User = require("./models/user");
const config = require("../../config");
const stripe = require("stripe")(config.STRIPE_SK);

exports.createSubscription = async function (req, res) {
  const user = res.locals.user;
  const { priceId, billingCycle } = req.body;

  try {
    const foundUser = await User.findOne({ _id: user._id }).select(
      "customerId subscriptionId email"
    );
    if (foundUser.isConfirmedPayment) {
      return res.status(400).send({
        detail:
          "既に契約済です。プラン変更は「アカウント設定」から行なってください。",
      });
    }
    if (!foundUser.customerId) {
      const customer = await stripe.customers.create({
        email: foundUser.email,
      });
      foundUser.customerId = customer.id;
    }

    const subscription = await stripe.subscriptions.create({
      customer: foundUser.customerId,
      items: [
        {
          price: priceId,
        },
      ],
      // billing_cycle_anchor_config: {
      //   hour: 0,
      //   minute: 0,
      //   second: 0,
      // },
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    if (!foundUser.customerId) {
      await User.updateOne(
        { _id: user._id },
        {
          customerId: customer.id,
          subscriptionId: subscription.id,
          billingCycle,
          currentPeriodEnd: subscription.current_period_end,
        }
      );
    } else {
      await User.updateOne(
        { _id: user._id },
        {
          subscriptionId: subscription.id,
          billingCycle,
          currentPeriodEnd: subscription.current_period_end,
        }
      );
    }

    return res.json({
      // subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (err) {
    return res.status(400).send({ detail: err.message });
  }
};

exports.confirmSubscription = async function (req, res) {
  const user = res.locals.user;

  try {
    await User.updateOne(
      { _id: user._id },
      {
        isConfirmedPayment: true,
      }
    );
  } catch (err) {
    return res.status(400).send({ detail: err.message });
  }
};

exports.updateSubscription = async function (req, res) {
  const user = res.locals.user;
  const { priceId, billingCycle } = req.body;

  try {
    const foundUser = await User.findOne({ _id: user._id }).select(
      "customerId subscriptionId email"
    );

    const currentSubscription = await stripe.subscriptions.retrieve(
      foundUser.subscriptionId
    );

    const newSubscription = await stripe.subscriptions.update(
      foundUser.subscriptionId,
      {
        items: [
          {
            id: currentSubscription.items.data[0].id,
            price: priceId,
          },
        ],
      }
    );

    await User.updateOne(
      { _id: user._id },
      {
        subscriptionId: newSubscription.id,
        billingCycle,
        currentPeriodEnd: newSubscription.current_period_end,
      }
    );

    return res.json(newSubscription);
  } catch (err) {
    return res.status(400).send({ detail: err.message });
  }
};

exports.cancelSubscription = async function (req, res) {
  const user = res.locals.user;

  try {
    const foundUser = await User.findOne({ _id: user._id }).select(
      "customerId subscriptionId email"
    );

    const currentSubscription = await stripe.subscriptions.retrieve(
      foundUser.subscriptionId
    );

    const newSubscription = await stripe.subscriptions.update(
      foundUser.subscriptionId,
      {
        items: [
          {
            id: currentSubscription.items.data[0].id,
            price: priceId,
          },
        ],
      }
    );

    await User.updateOne(
      { _id: user._id },
      {
        subscriptionId: newSubscription.id,
        billingCycle,
        currentPeriodEnd: newSubscription.current_period_end,
      }
    );

    return res.json(newSubscription);
  } catch (err) {
    return res.status(400).send({ detail: err.message });
  }
};
