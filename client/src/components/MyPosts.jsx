import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/posts/mine", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      }
    };

    fetchMyPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
    
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>My Posts</h2>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center" }}>You haven't created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            token={token}
            onDelete={handleDelete} 
            showDelete={true} 
          />
        ))
      )}
    </div>
  );
};

export default MyPosts;
