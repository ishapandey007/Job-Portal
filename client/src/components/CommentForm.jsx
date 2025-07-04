import React, { useState } from "react";
import axios from "axios";
import "./CommentForm.css";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setText("");
      onCommentAdded(res.data); // optional callback
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default CommentForm;
