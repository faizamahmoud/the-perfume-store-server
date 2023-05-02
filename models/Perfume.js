const mongoose = require("mongoose");

const PerfumeSchema = new mongoose.Schema({
	"Name": {
		type: String,
		require: true
	},
	"Brand": {
		type: String,
		require: true
	},
	"Description": {
		type: String,
		require: true
	},
	"Notes": {
		type: String,
		require: true
	},
	"ImageUrl": {
		type: String,
		require: true
	}, 
	"Price": {
		type: Number,
		default: Math.floor(Math.random() * 101) + 100 
	}
}, { timestamps: true });



const Perfume = mongoose.model("Perfume", PerfumeSchema);

module.exports = Perfume;


