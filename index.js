const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const methodOverride = require('method-override');
const parser = require('body-parser');
const urlencodedParser = parser.urlencoded({extended : false});
const PORT = process.env.PORT || 4000;

require('dotenv').config();


// controllers
const inventory = require('./controllers/inventory_controller');
const auth = require('./controllers/auth_controller');
const user = require('./controllers/user_controller');

// middleware

app.use(cors()); // to prevent cors errors, open access to all originsx
app.use(morgan("dev")); // logging for development

app.use(parser .json());
app.use(urlencodedParser) 
app.use(express.json()); 
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.use('/inventory', inventory);
app.use('/auth', auth);
app.use('/profile', user);


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));