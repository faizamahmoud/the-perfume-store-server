const express = require("express");
const router = express.Router();
const {getUsers, findUser, updateUser, deleteUser} = require("../controllers/user_controller");

// * Profile - 
router.get("/", getUsers);

router.get("/:id", findUser);

// //* update: email, password, username
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
