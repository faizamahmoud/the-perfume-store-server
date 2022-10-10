require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');
const { Perfume } = require('../models')

const { MONGODB_URI } = process.env

mongoose.connect(MONGODB_URI);


mongoose.connection
  .on("open", () => console.log("This is my awesome amazing connection"))
  .on("close", () => console.log("Your are disconnected from mongoose :'("))
  .on("error", (error) => console.log(error));


const seedData = async () => {
  try {
    const response = await axios.get('https://my-perfumes-api.herokuapp.com/perfumes');
    const perfumesList = response.data;
    const addPerfumes = await Perfume.insertMany(perfumesList);

  } catch (err) {
    console.log(err);
  }
}


seedData();