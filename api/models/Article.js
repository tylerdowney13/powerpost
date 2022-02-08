const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    contents: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
