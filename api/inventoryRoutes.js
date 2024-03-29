/*
* import controller
* router takes path and module from controller

*/

const express = require('express');
const router = express.Router();
const {getPerfumes, getUserById} = require('../controllers/inventory_controller');


router.get("/inventory", getPerfumes)

router.get("/inventory/:id", getUserById);

module.exports = router;