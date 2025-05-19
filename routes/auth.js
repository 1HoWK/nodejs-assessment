const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/auth");
// middleware
const authenticationMiddleware = require("../middleware/authentication");

router.post("/register", register);
router.post("/session/login", login);
router.post("/session/logout", authenticationMiddleware, logout);

module.exports = router;
