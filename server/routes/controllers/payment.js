const { normalizeErrors } = require("./helpers/mongoose");
const Payment = require("./models/payment");
const Prompt = require("./models/prompt");
const User = require("./models/user");
const config = require("../../config");
const stripe = require("stripe")(config.STRIPE_SK);

// Return all teachers revenues data
exports.getPayments = function (req, res) {};

exports.createPayment = async function (req, res) {
  const user = res.locals.user;
  const { priceId } = req.body;

  try {
    const foundUser = await User.findOne({ _id: user._id }).select(
      "customerId email"
    );
    if (!foundUser.customerId) {
      const customer = await stripe.customers.create({
        email: foundUser.email,
      });
      await User.updateOne({ _id: user._id }, { customerId: customer.id });
      foundUser.customerId = customer.id;
    }

    const subscription = await stripe.subscriptions.create({
      customer: foundUser.customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });
    return res.json({
      // subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (err) {
    return res.status(400).send({ detail: err.message });
  }
};
