const express = require("express");
const router = express.Router();
const {getUser} = require("../controllers/user_controller");

// * Profile - 
router.get("/", getUser);

// router.get("/:id", userController.getUserById);

// // //* update: email, password, username
// router.put("/:id", userController.updateUserById);

// router.delete("/:id", userController.deleteUserById);

module.exports = router;
