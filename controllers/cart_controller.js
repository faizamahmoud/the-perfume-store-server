/*
* token must be present to add to cart, if not, requires you to login
* add items to cart - saves to cart 
* remove item from cart 
* must be added to User model*/
const {User, Perfume} = require('../models')
const {requireToken} = require('../middleware/auth')


const addToCart = async (req, res) => {
  const { itemId } = req.body;
  const { userId } = req.user; // assuming that the authenticated user's id is available in req.user

  try {
    // Find the user and the perfume by their ids
    const user = await User.findById(userId);
    
    const perfume = await Perfume.findById(itemId);

    if (!user || !perfume) {
      // Return a 404 error if either the user or the perfume is not found
      return res.status(404).send('User or perfume not found');
    }

    // Add the perfume to the user's cart and save the changes to the user model
    user.basket.push(perfume);
    await user.save();

    // Return a success message with the updated user object
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
const removeFromCart = async (req, res) => {
    const { itemId } = req.params;
    const { userId } = req.user;
  
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
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  };
  
  
module.exports = { addToCart, removeFromCart};
