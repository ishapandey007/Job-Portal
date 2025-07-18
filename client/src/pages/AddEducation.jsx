import React, { useState } from "react";
import axios from "axios";


const AddEducation = () => {
  const [form, setForm] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
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
      await axios.post("http://localhost:5000/api/user/education", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Education added successfully!");
      setForm({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
      });
    } catch (err) {
      setMessage("Failed to add education");
      console.error(err);
    }
  };

  return (
    <div className="add-education-container">
      <h2>Add Education</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>School:</label>
          <input type="text" name="school" value={form.school} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Degree:</label>
          <input type="text" name="degree" value={form.degree} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Field of Study:</label>
          <input type="text" name="fieldofstudy" value={form.fieldofstudy} onChange={handleChange} required />
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
            Currently studying here
          </label>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={form.description} onChange={handleChange} />
        </div>

        <button type="submit">Add Education</button>
        {message && <p className="status-msg">{message}</p>}
      </form>
    </div>
  );
};

export default AddEducation;
