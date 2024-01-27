const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isVerified: { type: Boolean, default: true },
  isBanned: Boolean,

  name: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "name is required",
  },
  email: {
    type: String,
    max: [128, "Too long, max is 64 characters."],
    required: "Email is required",
  },
  password: {
    type: String,
    max: [32, "Too long, max is 32 characters."],
    min: [4, "Too short, min is 4 characters."],
    required: "Password is required",
  },
  description: String,
  image: String,
  stripe: String,

  homepage: String,
  twitter: String,

  prompts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Prompt",
    },
  ],
  newsletter: { type: Boolean, default: true },
});

userSchema.methods.hasSamePassword = function (requestPassword) {
  return bcrypt.compareSync(requestPassword, this.password);
};

userSchema.pre("save", function (next) {
  const user = this;

  // Skip if user didn't update user password
  if (user.password) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        // Store hash in your password DB.
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
