const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    author: {
      type: String,
      required: true,
      maxlength: 255,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    gender: {
      type: String,
      maxlength: 100,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
