const express = require('express')
const router = express.Router();
const {Perfume}  = require('../models')



router.get("/", async (req, res) => {
    try {
        res.json(await Perfume.find());
        // res.send('Hello')
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;