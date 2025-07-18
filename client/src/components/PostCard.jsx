import React, { useState } from "react";
import "./PostCard.css";
import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";

const PostCard = ({ post, token, showDelete = false, onDelete }) => {
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || []);

  const handleNewComment = (newComments) => {
    setComments(newComments);
  };

  return (
    <div className="post-card">
      {/* Post Header with Avatar and Info */}
      <div className="post-header">
        <img
          src={
            post.user?.avatar
              ? post.user.avatar
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="avatar"
          className="avatar"
        />
        <div className="post-info">
          <strong className="username">
            {post.user?.username || "Unknown"}
          </strong>
          <span className="post-date">
            {post.date ? new Date(post.date).toLocaleString() : "Unknown Date"}
          </span>
        </div>
        {/* Delete Button if authorized */}
        {showDelete && (
          <button
            className="delete-btn"
            onClick={() => onDelete(post._id)}
            style={{
              backgroundColor: "#ff4d4f",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "auto"
            }}
          >
            Delete
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">{post.text}</p>
        {post.image && (
          <img src={post.image} alt="post" className="post-img" />
        )}
      </div>

      {/* Actions: Like + Comment */}
      <div className="post-actions">
        <LikeButton postId={post._id} initialLikes={likes} />
        <CommentForm
          postId={post._id}
          token={token}
          onCommentAdded={handleNewComment}
        />
      </div>

      {/* Comments Section */}
      <div className="comments">
        {comments.map((c, index) => (
          <div key={index} className="comment">
            <img
              src={
                c.user?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="comment-avatar"
            />
            <div className="comment-body">
              <strong>{c.user?.username || "Unknown"}</strong>
              <span>: {c.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
