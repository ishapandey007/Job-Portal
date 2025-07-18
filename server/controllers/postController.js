const Post = require("../models/Post");

const createPost = async (req, res) => {
  const { title, text, image } = req.body;

  try {
    const post = new Post({
      user: req.user.id,
      title,
      text,
      image,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Post creation error:", err.message);
    res.status(500).send("Server error");
  }
};


const getAllPosts = async (req, res) => {
  try {
   const posts = await Post.find()
  .populate("user", "username avatar")
  .populate("comments.user", "username avatar")
  .sort({ date: -1 });

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

    const updatedPost = await Post.findById(req.params.id)
      .populate("comments.user", "username avatar");

    res.json(updatedPost.comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


const getMyPosts =async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .populate("user", "username avatar")
      .sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
      createPost, getAllPosts, likePost, commentPost, getMyPosts, deletePost}