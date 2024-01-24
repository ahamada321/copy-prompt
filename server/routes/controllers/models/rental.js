const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  isShared: { type: Boolean, default: false },

  name: {
    type: String,
    max: [128, "Too long, max is 128 characters."],
    required: "Prompt name is required",
  },
  description: String,
  prompt: String,
  memo: String,

  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Rental", rentalSchema);
