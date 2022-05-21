const specifitationRoute = require("express").Router();
const SpecController = require("../controllers/specController");

specifitationRoute.get("/", SpecController.getAllSpecs);

module.exports = specifitationRoute;
