
/* custom function createServer() to create an Express.js app instance
initialize and configure server */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const methodOverride = require("method-override");
const authRoutes = require("../api/authRoutes");
const inventoryRoutes = require("../api/inventoryRoutes");
const userRoutes = require("../api/userRoutes");
const cartRoute = require("../api/cartRoute");

function createServer () {

const app = express();

app.use(express.json()); 
app.use(methodOverride("_method"));


app.use(cors({
  origin:"*"
}))
app.use(morgan("dev")); // logging for development

app.use(express.urlencoded({extended:false}));

app.use("/", inventoryRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoute);

return app;
}
module.exports = createServer;
