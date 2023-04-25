const express = require("express");
const router = express.Router();
const {isAuth} = require("../middleware/auth")
const {register,  login, logout} = require("../controllers/auth_controller");


router.post("/register", register);

router.post("/login", login)

router.post("/logout", isAuth, logout)

module.exports = router;
