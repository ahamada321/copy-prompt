const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  isShared: { type: Boolean, default: false },

  name: {
    type: String,
    max: [30, "Too long, max is 30 characters."],
    required: "プロンプト名の入力は必須です",
  },
  selectedCategory: String, // Will be deleted in future.
  categories: [],
  description: String,
  prompt: String,
  image: String,
  rating: Number,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "プロンプト作成者の紐付けに失敗しました",
  },
});

module.exports = mongoose.model("Rental", rentalSchema);
