require("dotenv").config();
const mongoose = require("mongoose");
const Perfume = require("../models/Perfume");
const randomInt = require("random-integer");
const seed = require("./seed");
mongoose.set('strictQuery', true);

const { MONGODB_URI } = process.env;
// mongoose.connect(MONGODB_URI);
async function connect() {
	await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  
  async function close() {
	await mongoose.connection.close();
  }


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
};

const subset = getRandomSubset(uniqueObjects, 100);


async function reloadData() {
	try {
		let deletePreviousData = await Perfume.deleteMany({}, { maxTimeMS: 60000 });
		console.log(deletePreviousData)
		let reloading = await Perfume.insertMany(subset);
		console.log(reloading[0])
	} catch (err) {
		console.log(err);
	}

}

// reloadData();
module.exports = {
	connect,
	close
  };


