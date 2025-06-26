const Post = require("../models/Post");

const createPost = async (req, res) => {
  const { text, image } = req.body;

  try {
    const post = new Post({
      user: req.user.id,
      text,
      image
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username avatar").sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.find((like) => like.user.toString() === req.user.id)) {
      post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);
    } else {
      post.likes.unshift({ user: req.user.id });
    }
    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const commentPost = async (req, res) => {
  const { text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    const newComment = {
      user: req.user.id,
      text
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = {
    createPost, getAllPosts, likePost, commentPost
}