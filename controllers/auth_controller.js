
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // password hashing function
const { createUserToken} = require("../middleware/auth");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { User } = require("../models");



// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    req.body.password = passwordHash;
    const newUser = await User.create(req.body);
    res.send(newUser)
    // res.status(200).json({ currentUser: newUser, isLoggedIn: true, token }); // * userDoc gets sent to front end and then gets transformed 
  } catch (error) {
    res.status(400).json(error);
  }
});

// Login - token
router.post("/login", async (req, res, next) => {
  try {
    const loggingUser = req.body.username; //get username
    const foundUser = await User.findOne({ username: loggingUser });
    const token = await createUserToken(req, foundUser); //req- body with headers and compare against user - is it valid
    console.log("created token", token) //- verify in postman
    res.status(200).json({
      user: foundUser,
      isLoggedIn: true,
      token,
    });
  } catch (err) {
    res.status(401).json({ error: err.message , message: "you failed to authenticate"});
  }
});

// Logout - token
router.get("/logout", requireToken, async (req, res, next) => {
  try {
    const currentUser = req.user.username
    delete req.user
    res.status(200).json({
      message: `${currentUser} currently logged out`,
      isLoggedIn: false,
      token: "",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;


