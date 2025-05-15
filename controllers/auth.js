const express = require("express");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
// WIP
const register = async (req, res) => {
  const registeredUser = await User.create({ ...req.body });
  const { displayusername, userid } = registeredUser;
  console.log(registeredUser);
  res
    .status(StatusCodes.OK)
    .send({ displayusername: displayusername, userid: userid });
};

// not complete
const login = async (req, res) => {
  res.send("<h1>Login page</h1>");
};

// not complete
const logout = async (req, res) => {
  res.send("<h1>Login page</h1>");
};

module.exports = {
  register,
  login,
  logout,
};
