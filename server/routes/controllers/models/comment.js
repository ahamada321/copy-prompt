const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  comment: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  isReported: [{ type: Schema.Types.ObjectId, ref: "Report" }],
  prompt: { type: Schema.Types.ObjectId, ref: "Prompt" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Comment", commentSchema);
