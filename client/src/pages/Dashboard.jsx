import React, { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      API.get("/user/profile")
        .then((res) => setProfile(res.data))
        .catch((err) => console.error("Profile error:", err));
    }
  }, [user, navigate]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Welcome, {profile.username}</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
      {profile.skills?.length > 0 && (
        <p>
          <strong>Skills:</strong> {profile.skills.join(", ")}
        </p>
      )}
      <button onClick={logout} style={{ marginTop: "10px" }}>
        Logout
      </button>
    </div>
  );
}
