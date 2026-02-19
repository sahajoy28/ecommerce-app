import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    // Fetch full user object from database
    const user = await User.findById(decoded.id).select('-password').lean();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = {
      id: user._id.toString(),
      ...user
    };

    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};
