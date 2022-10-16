require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');
const seed = require('./seedUsersData')
const User = require('../models/User');
const seedUsersData = require('./seedUsersData');

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


// User.insertMany(seed,(err, users) => {
//   if (err){ console.log(err)}
//     console.log("added provided users data", seedUsersData)
//     mongoose.connection.close();
//   });

// seedData();