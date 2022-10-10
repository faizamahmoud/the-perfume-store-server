const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require("morgan")

const PORT = 4000;
require('dotenv').config();


// controllers
const inventory = require('./controllers/inventory_controller');
// const auth = require('./controllers/auth_controller');
// const profile = require('./controllers/profile_controller');
// const basket = require('./controllers/basket_controller');


// middleware

app.use(express.json()); 
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging for development
app.use('/inventory', inventory);
// app.use('/auth', auth);
// app.use('/profile', profile);
// app.use('/basket', basket);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));