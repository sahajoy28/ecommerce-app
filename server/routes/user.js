import express from 'express';
import User from '../models/User.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

// Middleware to verify user is authenticated
router.use(verify);

// ==================== ADDRESSES ====================

// Get all addresses
router.get('/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, addresses: user.addresses || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add new address
router.post('/addresses', async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zip, isDefault } = req.body;

    if (!address) {
      return res.status(400).json({ success: false, message: 'Address is required' });
    }

    const user = await User.findById(req.userId);

    // If marking as default, unmark others
    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    const newAddress = { name, email, phone, address, city, state, zip, isDefault: isDefault || false };
    user.addresses.push(newAddress);
    await user.save();

    res.json({ success: true, message: 'Address added', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update address
router.put('/addresses/:addressId', async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zip, isDefault } = req.body;
    const user = await User.findById(req.userId);

    const addressIndex = user.addresses.findIndex(a => a._id.toString() === req.params.addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    if (isDefault) {
      user.addresses.forEach(addr => addr.isDefault = false);
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex].toObject(),
      name: name || user.addresses[addressIndex].name,
      email: email || user.addresses[addressIndex].email,
      phone: phone || user.addresses[addressIndex].phone,
      address: address || user.addresses[addressIndex].address,
      city: city || user.addresses[addressIndex].city,
      state: state || user.addresses[addressIndex].state,
      zip: zip || user.addresses[addressIndex].zip,
      isDefault: isDefault !== undefined ? isDefault : user.addresses[addressIndex].isDefault
    };

    await user.save();
    res.json({ success: true, message: 'Address updated', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete address
router.delete('/addresses/:addressId', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.addressId);
    await user.save();
    res.json({ success: true, message: 'Address deleted', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== CART ====================

// Get cart
router.get('/cart', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to cart
router.post('/cart', async (req, res) => {
  try {
    const { productId, productName, price, quantity, image } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ success: false, message: 'Product ID and quantity required' });
    }

    const user = await User.findById(req.userId);
    
    // Check if item already in cart
    const cartItem = user.cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, productName, price, quantity, image });
    }

    await user.save();
    res.json({ success: true, message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update cart item quantity
router.put('/cart/:cartItemId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.userId);

    const cartItem = user.cart.find(item => item._id.toString() === req.params.cartItemId);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Cart item not found' });
    }

    if (quantity <= 0) {
      user.cart = user.cart.filter(item => item._id.toString() !== req.params.cartItemId);
    } else {
      cartItem.quantity = quantity;
    }

    await user.save();
    res.json({ success: true, message: 'Cart updated', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from cart
router.delete('/cart/:cartItemId', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(item => item._id.toString() !== req.params.cartItemId);
    await user.save();
    res.json({ success: true, message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Clear cart
router.delete('/cart', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = [];
    await user.save();
    res.json({ success: true, message: 'Cart cleared', cart: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==================== WISHLIST ====================

// Get wishlist
router.get('/wishlist', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, wishlist: user.wishlist || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to wishlist
router.post('/wishlist', async (req, res) => {
  try {
    const { productId, productName, price, image } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID required' });
    }

    const user = await User.findById(req.userId);
    
    // Check if already in wishlist
    if (user.wishlist.some(item => item.productId === productId)) {
      return res.status(400).json({ success: false, message: 'Already in wishlist' });
    }

    user.wishlist.push({ productId, productName, price, image });
    await user.save();
    res.json({ success: true, message: 'Item added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove from wishlist
router.delete('/wishlist/:wishlistItemId', async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.wishlist = user.wishlist.filter(item => item._id.toString() !== req.params.wishlistItemId);
    await user.save();
    res.json({ success: true, message: 'Item removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
