const houseRoutes = require("express").Router();
const HouseController = require("../controllers/houseController");
const multer = require("multer");
const upload = multer();
const uploadImages = require("../middlewares/uploadImages");
const authentication = require("../../users/middlewares/authen");
const authorization = require("../middlewares/authorize");

houseRoutes.get("/", HouseController.getAllHouses);
houseRoutes.post(
  "/",
  authentication,
  upload.array("Images", 5),
  uploadImages,
  HouseController.createHouse
);
houseRoutes.get("/:id", HouseController.getHouseById);
houseRoutes.put(
  "/:id",
  authentication,
  authorization,
  upload.array("Images", 5),
  uploadImages,
  HouseController.updateHouse
);
houseRoutes.delete(
  "/:id",
  authentication,
  authorization,
  HouseController.deleteHouse
);

module.exports = houseRoutes;
