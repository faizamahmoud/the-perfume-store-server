const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// * Profile - 
router.get("/", userController.getCurrentUser);

router.get("/:id", userController.getUserById);

// //* update: email, password, username
router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

module.exports = router;
