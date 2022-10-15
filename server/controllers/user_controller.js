
const express = require("express");
const router = express.Router();
const { User, Perfume } = require('../models');
const { handleValidateOwnership,handleUserValidateOwnership, requireToken } = require("../middleware/auth");




// * Profile  - 
router.get("/", requireToken, async (req, res) => {
    try {
        const currentUser = await User.findOne({ username: req.user.username })
        let jsonUser = JSON.stringify(currentUser)
        // console.log(requireToken)
        res.json(jsonUser)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get("/:id", requireToken, async (req, res) => {
    try {
        handleUserValidateOwnership(req, await User.findById(req.params.id))

        res.status(200).json("user profile accessed")
    } catch (error) {
        res.status(400).json("Not authenticated")
    }


    // //* update: email, password, username
    router.put("/:id", requireToken, async (req, res) => {
        // console.log(req.user, req.params.id) 
        try {
            handleUserValidateOwnership(req, await User.findById(req.params.id))
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
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
            handleUserValidateOwnership(req, await User.findById(req.params.id));
            const deleteProfile = await User.findByIdAndRemove(req.params.id);
            res.status(200).json(deleteProfile);
            // res.redirect('/inventory');
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });








    module.exports = router;