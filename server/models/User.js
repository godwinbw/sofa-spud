const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// import titleSchema from Title.js
const titleSchema = require("./Title");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    // set watchList to be an array of data that adheres to titleSchema
    watchList: [titleSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called watchListCount with number of titles saved to watchList
userSchema.virtual("watchListCount").get(function () {
  return this.watchList.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
