import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./CreateJob.css";
import { toast } from "react-toastify";

export default function CreateJob() {
  const nav = useNavigate();
  const [job, setJob] = useState({ title: "", text: "", image: "" });


  const handle = (e) => setJob({ ...job, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/posts", job);
    toast.success("Job created!");
    nav("/");        // back to feed
  };

  return (
    <form className="job-form" onSubmit={submit}>
      <h2>Create Job Post</h2>
       <input
    name="title"
    placeholder="Job title"
    onChange={handle}
    required
  />
      <textarea name="text" placeholder="Job description" onChange={handle} required/>
      <input name="image" placeholder="Image URL (optional)" onChange={handle}/>
      <button type="submit">Post</button>
    </form>
  );
}
