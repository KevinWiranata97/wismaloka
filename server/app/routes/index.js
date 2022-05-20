const router = require("express").Router();
const houseRoutes = require("./houseRoutes");
const specRoutes = require("./specRoutes");

router.use("/houses", houseRoutes);
router.use("/specs", specRoutes);

module.exports = router;
