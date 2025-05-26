const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser({ name, email, password,isAdmin=null }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');
console.log(name,email,password,isAdmin);

  const hashedPassword = await bcrypt.hash(password, 10);
  if(!isAdmin)
  {

    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  }
else
{
    const user = await User.create({ name, email, password: hashedPassword ,isAdmin:true});
return user;
}
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  };
}

const getUserById = async (userId) => {
  
  const user = await User.findById(userId).select('-password');
  return user;
};

const updateUser = async (userId, updates) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.name = updates.name || user.name;
  user.email = updates.email || user.email;

  const updatedUser = await user.save();
  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  };
};


module.exports = {
  registerUser,
  loginUser,
  updateUser,getUserById
};
