const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createPost,
  getAllPosts,
  likePost,
  commentPost
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.get("/", auth, getAllPosts);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);

module.exports = router;