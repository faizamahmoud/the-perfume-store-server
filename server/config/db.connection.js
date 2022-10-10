// require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose');

const { MONGODB_URI } = process.env

mongoose.connect(MONGODB_URI);


mongoose.connection
  .on("open", () => console.log("This is my awesome amazing connection"))
  .on("close", () => console.log("Your are disconnected from mongoose :'("))
  .on("error", (error) => console.log(error));

