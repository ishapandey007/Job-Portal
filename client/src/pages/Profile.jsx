import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ bio: "", skills: "", avatar: "" });
  const [expData, setExpData] = useState({ title: "", company: "", location: "", from: "", to: "", current: false, description: "" });
  const [eduData, setEduData] = useState({ school: "", degree: "", fieldofstudy: "", from: "", to: "", current: false, description: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setFormData({
          bio: res.data.bio || "",
          skills: res.data.skills || "",
          avatar: res.data.avatar || ""
        });
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleProfileUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/user/me", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      toast.success("Profile updated!")
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const handleAddExperience = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/experience", expData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile({ ...profile, experience: res.data });
      alert("Experience added");
    } catch (err) {
      console.error("Error adding experience", err);
    }
  };

  const handleAddEducation = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/user/education", eduData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile({ ...profile, education: res.data });
      alert("Education added");
    } catch (err) {
      console.error("Error adding education", err);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>{profile.username}'s Profile</h2>
    <div className="avatar-container">
  <img
    src={profile.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
    alt="avatar"
    className="profile-avatar"
  />
</div>

      <div className="profile-section">
        <label>Bio</label>
        <textarea
          rows="2"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />

        <label>Skills (comma separated)</label>
        <input
          type="text"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />

        <label>Avatar URL</label>
        <input
          type="text"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
        />

        <button onClick={handleProfileUpdate}>Update Profile</button>
      </div>

      <div className="profile-section">
        <h3>Add Experience</h3>
        <input type="text" placeholder="Title" onChange={(e) => setExpData({ ...expData, title: e.target.value })} />
        <input type="text" placeholder="Company" onChange={(e) => setExpData({ ...expData, company: e.target.value })} />
        <input type="text" placeholder="Location" onChange={(e) => setExpData({ ...expData, location: e.target.value })} />
        <input type="date" onChange={(e) => setExpData({ ...expData, from: e.target.value })} />
        <input type="date" onChange={(e) => setExpData({ ...expData, to: e.target.value })} />
        <textarea rows="2" placeholder="Description" onChange={(e) => setExpData({ ...expData, description: e.target.value })} />
        <button onClick={handleAddExperience}>Add Experience</button>
      </div>

      <div className="profile-section">
        <h3>Add Education</h3>
        <input type="text" placeholder="School" onChange={(e) => setEduData({ ...eduData, school: e.target.value })} />
        <input type="text" placeholder="Degree" onChange={(e) => setEduData({ ...eduData, degree: e.target.value })} />
        <input type="text" placeholder="Field of Study" onChange={(e) => setEduData({ ...eduData, fieldofstudy: e.target.value })} />
        <input type="date" onChange={(e) => setEduData({ ...eduData, from: e.target.value })} />
        <input type="date" onChange={(e) => setEduData({ ...eduData, to: e.target.value })} />
        <textarea rows="2" placeholder="Description" onChange={(e) => setEduData({ ...eduData, description: e.target.value })} />
        <button onClick={handleAddEducation}>Add Education</button>
      </div>

      <div className="profile-section">
        <h3>Experience</h3>
        <ul>
          {profile.experience?.map((exp, idx) => (
            <li key={idx}>
              {exp.title} at {exp.company} ({exp.from} to {exp.to || "Present"})
            </li>
          ))}
        </ul>
      </div>

      <div className="profile-section">
        <h3>Education</h3>
        <ul>
          {profile.education?.map((edu, idx) => (
            <li key={idx}>
              {edu.degree} at {edu.school} ({edu.from} to {edu.to || "Present"})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
