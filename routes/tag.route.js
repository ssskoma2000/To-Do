const express = require("express");
// Tag routes
const { checkToken } = require("../middleware/auth.middleware");
const route = express.Router();

const { CREATE, GET, DELETE_TAG } = require("../controllers/tag.controller");

route.get("/tags", checkToken, GET);
route.post("/tags", checkToken, CREATE);
route.delete("/tags/:id", checkToken, DELETE_TAG);

module.exports = route;
