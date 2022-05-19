const houseRoutes = require("express").Router();
const HouseController = require("../controllers/houseController");

houseRoutes.get("/", HouseController.getAllHouses);
houseRoutes.post("/", HouseController.createHouse);
houseRoutes.get("/:id", HouseController.getHouseById);
houseRoutes.put("/:id", HouseController.updateHouse);
houseRoutes.delete("/:id", HouseController.deleteHouse);

module.exports = houseRoutes;
