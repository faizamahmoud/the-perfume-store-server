const mongoose = require("mongoose");
const User = require("./User");


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
	}
	// "owner": {
	//   type: mongoose.Schema.Types.ObjectId,
	//   ref: User,
	//   // required: true
	//   default:''
	// }

}, { timestamps: true });



const Perfume = mongoose.model("Perfume", PerfumeSchema);

module.exports = Perfume;


