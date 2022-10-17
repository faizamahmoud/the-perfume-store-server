
const express = require("express");
const router = express.Router();
const { User} = require('../models');
// const { handleValidateOwnership, handleUserValidateOwnership, requireToken } = require("../middleware/auth");


// * Profile  - 
router.get("/", async (req, res) => {
    try {
        const currentUser = await User.findOne({ username: req.user.username })
        let jsonUser = JSON.stringify(currentUser)
        res.json(jsonUser)
    } catch (error) {
        res.status(400).json(error)
    }
});

router.get("/:id" ,async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id)
        let jsonUser = JSON.stringify(currentUser)
        console.log(jsonUser)
        res.status(200).json({user: jsonUser})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

    // //* update: email, password, username
    
    router.put("/:id", async (req, res) => {
        try {
          res.json(
            await User.findByIdAndUpdate(req.params.id, req.body)
          )
        } catch (error) {
          res.status(400).json(error);
        }
      });
      


      router.delete("/:id", async (req, res) => {
        try {
          res.json(await User.findByIdAndRemove(req.params.id));
        } catch (error) {
          res.status(400).json(error);
        }
      });
      

    module.exports = router;