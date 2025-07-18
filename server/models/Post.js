

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }, // <-- must exist here
    },
  ],
  date: {
    type: Date,
    default: Date.now, // <-- this ensures every post has a creation timestamp
  },
});

module.exports = mongoose.model("Post", PostSchema);
