const express = require("express");
const router = express.Router();
const {Perfume}  = require("../models");



router.get("/", async (req, res) => {
	try {
		res.json(await Perfume.find());
	} catch (error) {
		res.status(400).json(error);
	}
});



router.get("/:id", async (req, res) => {
	try {
		res.json(await Perfume.findById(req.params.id));
	} catch (error) {
		res.status(400).json(error);
	}
});




module.exports = router;