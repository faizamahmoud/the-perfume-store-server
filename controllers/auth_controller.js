
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // password hashing function
const { createUserToken } = require("../middleware/auth");
// const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { User } = require("../models");


//? @desc Register new user
//? @route POST /auth/register
//? @access Public

router.post("/register", async (req, res, next) => {
  
  try {
    const salt = await bcrypt.genSalt(10); // generate salt to hash password with 10 rounds
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    const pwStore = req.body.password; // store unhashed password temporarily 
    req.body.password = passwordHash;
    const newUser = await User.create(req.body);


    if (newUser) {
      req.body.password = pwStore;
      const authenticatedUserToken = createUserToken(req, newUser);
      return res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token: authenticatedUserToken, 
        isSignedUp: true
      });
    } else {
      res.status(400).json({ error: "Something went wrong" })
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



//? @desc Authenticate a user
//? @route POST /auth/login
//? @access Public

router.post("/login", async (req, res, next) => {
  try {
    const loggingUser = req.body.username;
    const foundUser = await User.findOne({ username: loggingUser });
    const token = await createUserToken(req, foundUser);
   
    return res.status(201).json({
      _id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      token: token, 
      isLoggedIn: true
    });
  } catch (err) {
    res.status(404).json({ message: "Email not found", error: err.message });
  }
});



module.exports = router;


