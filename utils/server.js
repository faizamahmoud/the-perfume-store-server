const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");

const app = express();

/*--- Route handlers ---*/ 
const authRoutes = require("../routes/authRoutes");
const inventoryRoutes = require("../routes/inventoryRoutes");
const userRoutes = require("../routes/userRoutes");

/*---built-in middleware functions provided by express---*/
app.use(express.json()); 
app.use(methodOverride("_method"));
app.use(cors()); // to prevent cors errors, open access to all originsx
app.use(morgan("dev")); // logging for development

/*--- Custom middleware ---*/ 
app.use(express.urlencoded({extended:false}));

app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/profile", userRoutes);

module.exports = app;
