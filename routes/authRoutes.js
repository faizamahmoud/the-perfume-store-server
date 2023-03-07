const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
  "/register",
  body("username").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  authController.registerUser
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  authController.loginUser
);

module.exports = router;
