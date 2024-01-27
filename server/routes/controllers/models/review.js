const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ALLOWED_RATING = [1, 2, 3, 4, 5];

const reviewSchema = new Schema({
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  prompt: { type: Schema.Types.ObjectId, ref: "Prompt" },
});

reviewSchema.pre("save", function (next) {
  const user = this;

  // Allay start from '0'
  if (ALLOWED_RATING.indexOf(this.rating) >= 0) {
    next();
  } else {
    const err = new Error({ rating: "Invalid rating!" });
    err.errors = {};
    err.errors.rating = { message: "Not valid rating!" };
    next(err);
  }
});

module.exports = mongoose.model("Review", reviewSchema);
