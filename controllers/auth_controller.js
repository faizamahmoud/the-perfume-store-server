
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // password hashing function
const { createUserToken} = require("../middleware/auth");
// const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { User } = require("../models");



router.post("/register", async (req, res, next) => {
  //   has the password before storing the user info in the database
  try {

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const pwStore = req.body.password;
    // we store this temporarily so the origin plain text password can be parsed by the createUserToken();

    req.body.password = passwordHash;
    const newUser = await User.create(req.body);
    
		if (newUser) {
      req.body.password = pwStore;
      const authenticatedUserToken = createUserToken(req, newUser);
      res.status(201).json({
        user: newUser,
        isLoggedIn: true,
        token: authenticatedUserToken,
      });
    } else {
      res.status(400).json({error: "Something went wrong"})
    }
  } catch (err) {
    res.status(400).json({ error : err.message });
  }
});



router.post("/login", async (req, res, next) => {
  try {
    const loggingUser = req.body.username;
    const foundUser = await User.findOne({ username: loggingUser });
    const token = await createUserToken(req, foundUser);
    return res.status(200).json({
      success:true,
      message:'Logged in successfully',
      user: foundUser,
      isLoggedIn: true,
      token
    });
  } catch (err) {
    res.status(404).json({ message: "Email not found", error: err.message });
  }
});



module.exports = router;


