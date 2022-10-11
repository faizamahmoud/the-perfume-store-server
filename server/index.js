const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require("morgan")

const PORT = 4000;
require('dotenv').config();


// controllers
const inventory = require('./controllers/inventory_controller');
const auth = require('./controllers/auth_controller');


// middleware

app.use(express.json()); 
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging for development
app.use('/inventory', inventory);
app.use('/', auth);


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));