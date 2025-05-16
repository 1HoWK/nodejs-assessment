const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/user");

router.get("/getmyprofile", getProfile);
router.post("/updatemyprofile", updateProfile);

module.exports = router;
