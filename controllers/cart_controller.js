
const { User, Perfume } = require('../models')


const getCartItems = async (req, res) => {
  const userId = req.user._id; 

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send('User not found');
    }

    const perfumeQuantities = user.basket.reduce((acc, id) => {
      acc[id] = acc[id] ? acc[id] + 1 : 1;
      return acc;
    }, {});
    

    const perfumes = await Promise.all(
      Object.entries(perfumeQuantities).map(([id, quantity]) =>
        Perfume.findById(id).lean().then((perfume) => ({
          ...perfume,
          quantity,
        }))
      )
    );

    return res.status(200).json(perfumes);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const addToCart = async (req, res) => {
  const itemId = req.body._id;
  // console.log('itemId', itemId)
  const userId = req.user._id;
  const quantity = req.body.quantity || 1; // default quantity is 1
  

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    const perfume = await Perfume.findById(itemId);
    if (!perfume) return res.status(404).send('Perfume not found');


    const perfumeIndex = user.basket.findIndex((item) => item.perfume && item.perfume._id == itemId);

    if (perfumeIndex === -1) {user.basket.push(perfume)}
    
    await user.save();
    console.log('user', user)
    
    res.status(200).json(user.basket);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const updateQuantity = async (req, res) => {
  const itemId = req.body._id;
  const userId = req.user._id;
  const quantity = req.body.quantity;
  console.log(quantity)
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');
    
    const perfumeIndex = user.basket.findIndex((perfume) => perfume._id == itemId);
    if (perfumeIndex === -1) return res.status(404).send('cant update the qty of an item that isnt in the cart');
    
    const perfume = user.basket[perfumeIndex];
    perfume.quantity +=  quantity;
    
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

    if (perfumeIndex === -1) {
      // Return a 404 error if either the user or the perfume is not found in the basket
      return res.status(404).send('Item not found in basket');
    }

    const perfume = user.basket[perfumeIndex];
    if (perfume.quantity > 1) {
      // If the perfume quantity is greater than 1, decrement it
      perfume.quantity -= 1;
    } else {
      // If the perfume quantity is 1, remove the perfume from the basket
      user.basket.splice(perfumeIndex, 1);
    }

    // Save the changes to the user model
    await user.save();

    res.status(200).json(user.basket);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};
module.exports = { getCartItems, addToCart, updateQuantity, removeFromCart };

