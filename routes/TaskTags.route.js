const express = require("express");
// TaskTags routes
const { checkToken } = require("../middleware/auth.middleware");
const route = express.Router();

const { CREATE, GET, DELETE } = require("../controllers/TaskTags.controller");

route.get("/tasks/:taskId/tags", checkToken, GET);
route.post("/tasks/:taskId/tags/:tagId", checkToken, CREATE);
route.delete("/tasks/:taskId/tags/:tagId", checkToken, DELETE);

module.exports = route;
