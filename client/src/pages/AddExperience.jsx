import React, { useState } from "react";
import axios from "axios";
import "./AddExperience.css";

const AddExperience = () => {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/user/experience", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Experience added successfully!");
      setForm({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
      });
    } catch (err) {
      setMessage("Failed to add experience");
      console.error(err);
    }
  };

  return (
    <div className="add-experience-container">
      <h2>Add Experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title:</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Company:</label>
          <input type="text" name="company" value={form.company} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>From Date:</label>
          <input type="date" name="from" value={form.from} onChange={handleChange} required />
        </div>

        {!form.current && (
          <div className="form-group">
            <label>To Date:</label>
            <input type="date" name="to" value={form.to} onChange={handleChange} />
          </div>
        )}

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="current"
              checked={form.current}
              onChange={handleChange}
            />
            Currently working here
          </label>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <button type="submit">Add Experience</button>
        {message && <p className="status-msg">{message}</p>}
      </form>
    </div>
  );
};

export default AddExperience;
