const Review = require("./models/review");
const User = require("./models/user");
const Prompt = require("./models/prompt");
const { normalizeErrors } = require("./helpers/mongoose");

exports.getReviews = function (req, res) {
  const { promptId } = req.query;

  Review.find({ prompt: promptId })
    .populate("user", "-password")
    .sort({ cretatedAt: -1 })
    .limit(3)
    .exec((err, foundReviews) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundReviews);
    });
};

exports.getPromptRating = function (req, res) {
  const promptId = req.query.id;

  Review.aggregate(
    [
      { $unwind: "$prompt" },
      {
        $group: {
          _id: promptId,
          ratingAvg: { $avg: "$rating" },
        },
      },
    ],
    function (err, result) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(result[0]["ratingAvg"]);
    }
  );
};

exports.createReview = function (req, res) {
  const reviewData = req.body;
  const user = res.locals.user;
};
