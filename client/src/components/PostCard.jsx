import React, { useState } from "react";
import "../index.css";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";

const PostCard = ({ post, token }) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  const handleNewComment = (newComments) => {
    setComments(newComments);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.user.avatar || "https://via.placeholder.com/40"}
          alt="avatar"
          className="avatar"
        />
        <div className="post-info">
          <strong>{post.user.username}</strong>
          <span>{new Date(post.date).toLocaleString()}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.text}</p>
        {post.image && <img src={post.image} alt="post" className="post-img" />}
      </div>

      <div className="post-actions">
        <LikeButton postId={post._id} initialLikes={likes} />
        <CommentForm postId={post._id} onCommentAdded={handleNewComment} />
        <div className="comments">
          {comments.map((c, index) => (
            <div key={index} className="comment">
              <strong>{c.user}</strong>: {c.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
