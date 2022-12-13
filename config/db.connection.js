require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');
// const seed = require('./seedUsersData')
const Perfume = require('../models/Perfume');
const seedPerfumeData = require('./seedPerfumeData');

// const { Perfume } = require('../models')
const { MONGODB_URI } = process.env
mongoose.connect(MONGODB_URI);



mongoose.connection
  .on("open", () => console.log("This is my awesome amazing connection"))
  .on("close", () => console.log("Your are disconnected from mongoose :'("))
  .on("error", (error) => console.log(error));

// const seedData = async () => {
//   try {
//     const response = await fetch('https://my-perfumes-api.herokuapp.com/perfumes');
//     let perfumesList = await response.json();
//     console.log(perfumesList)
//     perfumesList = perfumesList.data
//     console.log('hello', response);

//     const addPerfume = await Perfume.insertMany(perfumesList);

//     console.log(addPerfume)

//   } catch (err) {
//     console.log(err);
//   }
// }

// seedData();


// Perfume.insertMany(seed,(err, users) => {
//   if (err){ console.log(err)}
//     console.log("added provided users data", seedPerfumeData)
//     mongoose.connection.close();
//   });

async function reloadData() {
	try {
		let deleted = await Perfume.deleteMany({});
		console.log(deleted)
		// console.log(deleted);
		let reloading = await Perfume.insertMany(seedPerfumeData);
		console.log(reloading)
	} catch (err) {
		console.log(err);
	}
}

// reloadData();