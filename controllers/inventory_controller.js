/* controller handles user requests and generating appropriate response, only interacts with the model*/
const express = require("express");
const router = express.Router();
const {Perfume}  = require("../models");


const getPerfumes = ((req,res) => {
	res.json(Perfume.find())
})


const getUserById = async (req, res) => {
	try {
		const perfume = await Perfume.findById(req.params.id);
		res.json(perfume)
	} catch (error) {
		res.status(400).json(error);
	}
};


module.exports = {
	getPerfumes, 
	getUserById
};