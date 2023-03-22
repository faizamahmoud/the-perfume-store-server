
const express = require("express");
const { User} = require("../models");
// const { handleValidateOwnership, handleUserValidateOwnership, requireToken } = require("../middleware/auth");
// The handleValidateOwnership and handleUserValidateOwnership functions are used to check if the user making the request is the owner of the resource they are trying to access, and throw an error if they are not authorized to access it.

// These functions can be used when you need to restrict access to certain resources based on ownership. For example, if you have a route that allows users to update their own profile information, you would use handleUserValidateOwnership to ensure that the user making the request is actually the owner of the profile they are trying to update. Similarly, if you have a route that allows owners of a product to update its information, you would use handleValidateOwnership to ensure that the user making the request is the owner of the product they are trying to update.

// These functions can help you prevent unauthorized access to sensitive data by ensuring that only the appropriate users are able to access and modify the data.

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