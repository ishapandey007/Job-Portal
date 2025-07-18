import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import "./Feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts(res.data);
    setLoading(false);
  } catch (err) {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="feed-loading">Loading posts...</div>;

  return (
    <div className="feed-container">
      <h2>Job Feed</h2>
      {posts.length === 0 ? (
        <p>No jobs available yet.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Feed;