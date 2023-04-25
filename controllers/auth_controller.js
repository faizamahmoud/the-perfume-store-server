
const express = require("express");
const bcrypt = require("bcrypt"); // password hashing function
const { createUserToken, isAuth } = require("../middleware/auth");
// const { handleValidateOwnership, requireToken } = require("../middleware/auth");
const { User } = require("../models");
const router = require("../api/inventoryRoutes");


//? @desc Register new user
//? @route POST /auth/register
//? @access Public

const register = async (req, res) => {

	try {
		const salt = await bcrypt.genSalt(10); // generate salt to hash password with 10 rounds
		const passwordHash = await bcrypt.hash(req.body.password, salt);
		const pwStore = req.body.password; // store unhashed password temporarily 
		req.body.password = passwordHash;
		const newUser = await User.create(req.body);


		if (newUser) {

			req.body.password = pwStore;
			const authenticatedUserToken = createUserToken(req, newUser);
			return res.status(201).json({
				_id: newUser.id,
				username: newUser.username,
				email: newUser.email,
				token: authenticatedUserToken,
			});
		} else {
			res.status(400).json({ error: "New user not created" });
		}
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};



//? @desc Authenticate a user
//? @route POST /auth/login
//? @access Public

const login = async (req, res) => {

	try {
		const user = req.body.username;
		// console.log('user: ', user)
		const foundUser = await User.findOne({ username: user })
		const token = await createUserToken(req, foundUser);
		// console.log(foundUser)

		return res.status(201).json({
			_id: foundUser.id,
			username: foundUser.username,
			password: foundUser.password,
			token: token,

		});
	} catch (err) {
		res.status(404).json({ message: "server: user not found", error: err.message });
	}
};

const logout = async (req, res) => {
	try {
		res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
		return res.json({ success: true, message: 'Logged out successfully!' });
	} catch (error) {
		console.log(error)
	}
};




module.exports = {
	register, login, logout
};


