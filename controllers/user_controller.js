
const express = require("express");
const { User} = require("../models");
// const { handleValidateOwnership, handleUserValidateOwnership, requireToken } = require("../middleware/auth");


// * Profile  - 
const getUsers = async (req, res) => {
	try {
		const currentUser = await User.findOne({ username: req.user.username });
		let jsonUser = JSON.stringify(currentUser);
		res.json(jsonUser);
	} catch (error) {
		res.status(400).json(error);
	}
}

const findUser = async (req, res) => {
	try {
		const currentUser = await User.findById(req.params.id);
		res.json({user: currentUser});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// //* update: email, password, username
    
const updateUser = async (req, res) => {
	try {

		// console.log(req.body);
		const user = await User.findByIdAndUpdate(req.params.id,req.body)
		res.json(user)
	} catch (error) {
		res.status(400).json(error);
	}
};
      


const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndRemove(req.params.id);
		res.json(user)
	} catch (error) {
		res.status(400).json(error);
	}
};
      

module.exports = {
	getUsers,
	findUser,
	updateUser,
	deleteUser
};