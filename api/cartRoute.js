const express = require('express');
const router = express.Router();
const {getCartItems, addToCart, updateQuantity, removeFromCart} = require('../controllers/cart_controller')
const {requireToken} = require('../middleware/auth')


router.get('/', requireToken, getCartItems)
router.post('/', requireToken, addToCart)
router.put('/', requireToken, updateQuantity)
router.delete('/', requireToken, removeFromCart)


module.exports = router;
