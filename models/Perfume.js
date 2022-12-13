const mongoose = require("mongoose");

const PerfumeSchema = new mongoose.Schema({
  "id": Number,
  "brand": {
    type: String,
    require: true
  },
  "name": {
    type: String,
    require: true
  },
  "price": {
    type: Number,
    require: true
  },
  "description": {
    type: String,
    require: true
  },
  "size": {
    type: String,
    require: true
  },
  "image": String,
  "occasions": {
    type: [String],
    require: true
  },
  "scent-family": {
    type: String,
    require: true
  },
  "type": {
    type: String,
    require: true
  },
  "top notes": [String],
  "middle notes": [String],
  "base notes": [String],
  "units": {
    type: Number,
    require: true
  }
  // "owner": {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   // required: true
  //   default:''
  // }

}, { timestamps: true });



const Perfume = mongoose.model("Perfume", PerfumeSchema);

module.exports = Perfume;


