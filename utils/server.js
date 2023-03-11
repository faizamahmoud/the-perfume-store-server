
/* custom function createServer() to create an Express.js app instance
initialize and configure server */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");
const authRoutes = require("../routes/authRoutes");
const inventoryRoutes = require("../routes/inventoryRoutes");
const userRoutes = require("../routes/userRoutes");

function createServer () {

const app = express();

app.use(express.json()); 
app.use(methodOverride("_method"));
app.use(cors()); // to prevent cors errors, open access to all originsx
app.use(morgan("dev")); // logging for development

app.use(express.urlencoded({extended:false}));

app.use("/auth", authRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/profile", userRoutes);

return app;
}
module.exports = createServer;