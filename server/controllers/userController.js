const User = require("../models/User");

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const updateProfile = async (req, res) => {
  const { bio, skills, avatar } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { bio, skills, avatar },
      { new: true }
    ).select("-password");
    res.json(updated);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const addExperience = async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const newExp = { title, company, location, from, to, current, description };
    user.experience.unshift(newExp);
    await user.save();
    res.json(user.experience);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

const addEducation = async (req, res) => {
  const { school, degree, fieldofstudy, from, to, current, description } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const newEdu = { school, degree, fieldofstudy, from, to, current, description };
    user.education.unshift(newEdu);
    await user.save();
    res.json(user.education);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = {
    getMyProfile, updateProfile, addEducation, addExperience
}