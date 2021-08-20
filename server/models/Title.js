const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `watchList` array in User.js
const titleSchema = new Schema({
  imdbId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  titleType: {
    type: String,
  },
  year: {
    type: String,
  },
  plot: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  thumbRating: {
    type: String,
  },
});

module.exports = titleSchema;
