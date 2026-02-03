const express = require("express");
const { checkToken } = require("../middleware/auth.middleware");
const route = express.Router();

const {
  CREATE,
  GET,
  GET_BY_ID,
  DELETE,
  UPDATE,
} = require("../controllers/task.controller");

route.get("/tasks", checkToken, GET);
route.get("/tasks/:id", checkToken, GET_BY_ID);
route.post("/tasks", checkToken, CREATE);
route.put("/tasks/:id", checkToken, UPDATE);
route.delete("/tasks/:id", checkToken, DELETE);

module.exports = route;
