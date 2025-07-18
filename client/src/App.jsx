// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import CreateJob from "./pages/CreateJob";
import Navbar from "./components/Navbar";
import MyPosts from "./components/MyPosts";
import PrivateRoute from "./components/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";
import "./index.css";


function App() {
  return (
    
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute>
              <CreateJob />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
           <Route path="/myposts" element={
            <PrivateRoute>
              <MyPosts />
            </PrivateRoute>
          } />


          


          
        </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
   
  );
}

export default App;
