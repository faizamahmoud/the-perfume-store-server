const express = require('express');
const router = express.Router();
const {addToCart, removeFromCart} = require('../controllers/cart_controller')
const {requireToken} = require('../middleware/auth')



// router.post('/', requireToken, addToCart)
// router.delete('/', requireToken, removeFromCart)


router.post('/', addToCart)
router.delete('/', removeFromCart)

module.exports = router;
