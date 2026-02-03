const express = require("express");
// Auth routes
const { LOGIN, REGISTER } = require("../controllers/auth.controller.js");

const route = express.Router();

route.post("/login", LOGIN);
route.post("/register", REGISTER);

module.exports = route;
