/* controller handles user requests and generating appropriate response, only interacts with the model*/
const {Perfume}  = require("../models");


const getPerfumes = async (req, res) => {
	try {
		const perfumes = await Perfume.find();
		// console.log(perfumes)
		return res.json(perfumes);
	} catch (error) {
		res.status(400).json(error);
	}
}
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