require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');
const Perfume = require('../models/Perfume');
// const { Perfume, User } = require('../models')
const randomInt = require('random-integer');
const seed = require('./seed');


const { MONGODB_URI } = process.env
mongoose.connect(MONGODB_URI);



mongoose.connection
	.on("open", () => console.log("This is my awesome amazing connection"))
	.on("close", () => console.log("Your are disconnected from mongoose :'("))
	.on("error", (error) => console.log(error));




const uniqueBrands = [...new Set(seed.map(item => item.Brand))];

const uniqueObjects = seed.filter(item => uniqueBrands.includes(item.Brand));

const getRandomSubset = (array, size) => {
	const subset = [];
	const usedIndexes = new Set();
  
	while (subset.length < size && usedIndexes.size < array.length) {
	  const index = randomInt(0, array.length - 1);
	  if (!usedIndexes.has(index)) {
		subset.push(array[index]);
		usedIndexes.add(index);
	  }
	}
	return subset;
  }

const subset = getRandomSubset(uniqueObjects, 100);


async function reloadData() {
	try {
		let deletePreviousData = await Perfume.deleteMany({});
		let reloading = await Perfume.insertMany(subset)
		console.log(reloading)
	} catch (err) {
		console.log(err)
	}

}

// reloadData();
