const express = require("express");
const router = express.Router();
const UserController = require("../controlllers/userController");
const authentication = require("../middlewares/authen");
const authorization = require("../middlewares/authorize");

const multer = require("multer");

const upload = multer();

router.post("/users/login", UserController.login);

router.post(
  "/users/registerAdmin",
  upload.single("profilePict"),
  UserController.adminRegister
);
router.post(
  "/users/registerUser",
  upload.single("profilePict"),
  UserController.userRegister
);
router.post(
  "/users/registerAgen",
  upload.single("profilePict"),
  UserController.agenRegister
);

router.get("/users", UserController.fetchUser);

router.get("/users/:id", UserController.fetchOneUser);

router.use(authentication);
router.post("/payment", UserController.payment);

router.patch("/premiumAgen", UserController.premiumUser);

router.delete("/users/:id", authorization, UserController.deleteUser);

module.exports = router;
