/*
* token must be present to add to cart, if not, requires you to login
* add items to cart - saves to cart 
* remove item from cart 
* must be added to User model*/
//! helper functions for user id and basket
const { User, Perfume } = require('../models')
const getCartItems = async (req, res) => {
  const userId = req.user._id; // assuming that the authenticated user's id is available in req.user
  console.log(req)

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send('User not found');
    }

    const perfumes = await Promise.all(user.basket.map(id => Perfume.findById(id)));
    return res.status(200).json(perfumes);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const addToCart = async (req, res) => {
  const itemId = req.body._id;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');
    
    const perfume = await Perfume.findById(itemId);
    if (!perfume) return res.status(404).send('perfume not found');
    
    user.basket.push(perfume);
    await user.save();

    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const removeFromCart = async (req, res) => {
  const itemId = req.body._id;
  const userId = req.user._id;

  try {
    // Find the user and the perfume by their ids
    const user = await User.findById(userId);
    const perfumeIndex = user.basket.findIndex((perfume) => perfume._id == itemId);

    if (!user || perfumeIndex === -1) {
      // Return a 404 error if either the user or the perfume is not found in the basket
      return res.status(404).send('Item not found in basket');
    }

    // Remove the perfume from the user's cart and save the changes to the user model
    user.basket.splice(perfumeIndex, 1);
    await user.save();

    // Return a success message with the updated user object
    res.status(200).json(user.basket);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};


module.exports = { getCartItems, addToCart, removeFromCart };
