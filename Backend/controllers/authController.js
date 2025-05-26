const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  
  const user = await authService.getUserById(req.user.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json(user);
};


exports.updateProfile = async (req, res) => {
  console.log(req.user);
  const updated = await authService.updateUser(req.user.id, req.body);
  res.json(updated);
};
