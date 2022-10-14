
const express = require("express");
const router = express.Router();
const { User, Perfume } = require('../models');
const { handleValidateOwnership, requireToken } = require("../middleware/auth");




// * Profile  - 
router.get("/", requireToken, async (req, res) => {
    try{
        const currentUser = await User.findOne({username: req.user.username})
        let req = JSON.stringify(currentUser)
        // console.log(req)

        res.json(req)
    } catch (error){
        res.status(400).json(error)
    }
  });

// //* update: email, password, username
router.put("/:id", requireToken, async (req, res) => {
    try {
        handleValidateOwnership(req, await User.findById(req.params.id))
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body.username,
            req.body.email,
            req.body.password,
            { new: true }
        )
        res.status(200).json(updateUser)
    } catch (error) {
        //send error
        res.status(400).json({ error: error.message })
    }
})



router.delete("/:id", requireToken, async (req, res, next) => {
    try {
        handleValidateOwnership(req, await User.findById(req.params.id));
        const deleteProfile = await User.findByIdAndRemove(req.params.id);
        res.status(200).json(deleteProfile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});








module.exports = router;