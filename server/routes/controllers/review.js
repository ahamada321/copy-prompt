const Review = require("./models/review");
const User = require("./models/user");
const Rental = require("./models/rental");
const { normalizeErrors } = require("./helpers/mongoose");

exports.getReviews = function (req, res) {
  const { rentalId } = req.query;

  Review.find({ rental: rentalId })
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

exports.getRentalRating = function (req, res) {
  const rentalId = req.query.id;

  Review.aggregate(
    [
      { $unwind: "$rental" },
      {
        $group: {
          _id: rentalId,
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
