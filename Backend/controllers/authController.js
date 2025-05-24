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
