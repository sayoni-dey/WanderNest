// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Adjust path based on your backend structure

const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for authorization token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[0] === 'Bearer' 
        ? req.headers.authorization.split(' ')[1] 
        : req.headers.authorization;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and attach to request object
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User matching this token no longer exists' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
  }
};

// Role restrictions gatekeeper
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action (Hosts Only)'
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };