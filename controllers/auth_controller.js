
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // password hashing function
// const { createUserToken} = require("../middleware/auth");
// const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { User } = require("../models");



// Register - keep auth
router.post("/register", async (req, res) => {
  try {
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    req.body.password = passwordHash;
    const newUser = await User.create(req.body);
    // res.send(newUser)
    // res.sendStatus(status)
    res.status(200).json({ currentUser: newUser}); 
  } catch (error) {
    res.status(400).json(error);
  }
});


router.get('/login/:userId', async (req, res, next) => {
  try {
    const login = req.params.userId
    const foundUser = await User.findOne({ userId: login });
    console.log(foundUser)
    
    res.status(200).json({"success":foundUser});
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


// Logout - does not work
// router.delete("/logout",  async (req, res, next) => {
//   try {
//     const logoutUser = req.user.username
//      console.log(logoutUser)
//     req.logout(req.user)
//     res.status(200).json({
//       message: `${logoutUser} currently logged out`,
//       isLoggedIn: false,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });



module.exports = router;


