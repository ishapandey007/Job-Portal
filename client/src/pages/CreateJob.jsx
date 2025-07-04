import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreateJob() {
  const nav = useNavigate();
  const [job, setJob] = useState({ text:"", image:"" });

  const handle = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/posts", job);
    nav("/");        // back to feed
  };

  return (
    <form className="job-form" onSubmit={submit}>
      <h2>Create Job Post</h2>
      <textarea name="text" placeholder="Job description" onChange={handle} required/>
      <input name="image" placeholder="Image URL (optional)" onChange={handle}/>
      <button type="submit">Post</button>
    </form>
  );
}
