const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getMyProfile,
  updateProfile,
  addExperience,
  addEducation,
} = require("../controllers/userController");

router.get("/profile", auth, getMyProfile);
router.put("/update", auth, updateProfile);
router.post("/experience", auth, addExperience);
router.post("/education", auth, addEducation);

module.exports = router;
