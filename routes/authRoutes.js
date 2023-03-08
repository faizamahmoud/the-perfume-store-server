const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth_controller");


router.post(
  "/register",
  body("name").notEmpty(),
  body("username").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    try {
      const user = await authController.registerUser(req, res);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post(
  "/login",
  body("username").isEmail(),
  body("password").notEmpty(),
  async (req,res) => {
    try {
      const user = await authController.loginUser(req,res);
    res.status(201).json(user);
  }catch(err) {
    res.status(500).json({ message: "Internal server error"})
  }
}
  
);

module.exports = router;
