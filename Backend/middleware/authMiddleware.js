const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ;

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, isAdmin }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user?.isAdmin)
    return res.status(403).json({ message: 'Admin access only' });
  next();
};
