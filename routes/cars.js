const express = require("express");
const router = express.Router();
const getCars = require("../controllers/cars");

router.post("/carlist", getCars);

module.exports = router;
