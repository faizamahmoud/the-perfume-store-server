const express = require('express');
const router = express.Router();
const {getCartItems, addToCart, removeFromCart} = require('../controllers/cart_controller')
const {requireToken} = require('../middleware/auth')


router.get('/', requireToken, getCartItems)
router.post('/', requireToken, addToCart)
router.delete('/', requireToken, removeFromCart)


module.exports = router;
