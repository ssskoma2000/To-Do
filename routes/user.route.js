const express = require("express");
// User routes
const { checkToken } = require("../middleware/auth.middleware");
const route = express.Router();

const {
  GET,
  GET_BY_ID,
  DELETE_USER,
  UPDATE_USER,
} = require("../controllers/user.controller");

route.get("/users", checkToken, GET);
route.get("/users/:id", checkToken, GET_BY_ID);
route.put("/users/:id", checkToken, UPDATE_USER);
route.delete("/users/:id", checkToken, DELETE_USER);

module.exports = route;
