import React, { useState } from "react";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";
import "./LikeButton.css";




const LikeButton = ({ postId, initialLikes = [] }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLikes(res.data);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  return (
    <div className="like-button" onClick={handleLike}>
      <AiFillLike color="#007bff" />
      <span>{likes.length} Likes</span>
    </div>
  );
};

export default LikeButton;
