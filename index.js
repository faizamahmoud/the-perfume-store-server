// dependencies

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const {readdirSync} = require("fs");


// controllers
const inventory = require("./controllers/inventory_controller");
const auth = require("./controllers/auth_controller");
const user = require("./controllers/user_controller");


// const eslintConfig = require("./eslintrc.js");


/*---built-in middleware functions provided by express---*/
app.use(express.json()); 
app.use(methodOverride("_method"));
app.use(cors()); // to prevent cors errors, open access to all originsx
app.use(morgan("dev")); // logging for development

/*--- Custom middleware ---*/ 
app.use(express.urlencoded({extended:false}));

/*--- Route handlers ---*/ 
app.use("/auth", auth);
app.use("/inventory", inventory);
app.use("/profile", user);


readdirSync("./controllers").map((file)=>app.use("/",require("./controllers/"+file)));

// listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));