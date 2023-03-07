// dependencies

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");
// const PORT = process.env.PORT || 4000;
const PORT = 4000;
require("dotenv").config();
// const {readdirSync} = require("fs");


/*---built-in middleware functions provided by express---*/
app.use(express.json()); 
app.use(methodOverride("_method"));
app.use(cors()); // to prevent cors errors, open access to all originsx
app.use(morgan("dev")); // logging for development


// const eslintConfig = require("./eslintrc.js");

/*--- Custom middleware ---*/ 
app.use(express.urlencoded({extended:false}));

/*--- Route handlers ---*/ 
const authRoutes = require("./routes/auth");
const inventoryRoutes = require("./routes/inventory");
const userRoutes = require("./routes/user");

app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/profile", userRoutes);

// readdirSync("./controllers").map((file)=>app.use("/",require("./controllers/"+file)));

// listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));