import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch current data to prefill
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBio(res.data.bio || "");
        setSkills(res.data.skills?.join(", ") || "");
        setAvatar(res.data.avatar || "");
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/me",
        {
          bio,
          skills: skills.split(",").map((skill) => skill.trim()),
          avatar,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Error updating profile");
      console.error(err);
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Skills (comma separated):</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Avatar URL:</label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>

        <button type="submit">Update</button>
        {message && <p className="status-msg">{message}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile;
