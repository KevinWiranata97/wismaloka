const houseRoutes = require("express").Router();
const HouseController = require("../controllers/houseController");
const multer = require("multer");
const upload = multer();
const uploadImages = require("../middlewares/uploadImages");

houseRoutes.get("/", HouseController.getAllHouses);
houseRoutes.post("/", upload.array("Images", 5), uploadImages, HouseController.createHouse);
houseRoutes.get("/:id", HouseController.getHouseById);
houseRoutes.put("/:id", HouseController.updateHouse);
houseRoutes.delete("/:id", HouseController.deleteHouse);

module.exports = houseRoutes;
