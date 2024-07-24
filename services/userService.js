const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const saltRounds = config.auth.saltRounds;
const jwtSecret = config.auth.jwtSecret;
const jwtExpiration = config.auth.jwtExpiration;

const createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });
    await newUser.save(); 
    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error('Error fetching user: ' + error.message);
  }
};

const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error('Error updating user: ' + error.message);
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error('Error deleting user: ' + error.message);
  }
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, config.auth.jwtSecret, { expiresIn: config.auth.jwtExpiration });
  const refreshToken = jwt.sign({ id: user._id }, config.auth.refreshJwtSecret, { expiresIn: config.auth.refreshJwtExpiration });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email
  };

  return { user: userResponse, token, refreshToken };
};
const refreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, config.auth.refreshJwtSecret);
    const token = jwt.sign({ id: decoded.id }, config.auth.jwtSecret, { expiresIn: config.auth.jwtExpiration });
    return token;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
  refreshToken,
};
