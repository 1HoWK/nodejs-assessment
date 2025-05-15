const express = require("express");
const { register, login, logout } = require("../controllers/auth");
const router = express.Router();
//controllers

router.post("/register", register);
router.post("/session/login", login);
router.post("/session/logout", logout);

module.exports = router;
