// Inventory requires two routes: index and show routes

const express = require('express')
const router = express.Router();



router.get("/", async (req, res) => {
	res.status(200).json({message: "all inventory"})
});

router.get("/:id", async (req,res) => {
    res.status(200).json({message: "one perfume"})
})
module.exports=router;