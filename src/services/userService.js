const { User } = require('../../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {auth} = require('../../config/index');

const saltRounds = auth.saltRounds;
const jwtSecret = auth.jwtSecret;
const jwtExpiration = auth.jwtExpiration;
const refreshJwtSecret = auth.refreshJwtSecret;
const refreshJwtExpiration=auth.refreshJwtExpiration
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
    const user = await User.updateOne({_id:id}, updateData);
    
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    console.error('Error updating user:', error.message); // Log the error
    throw new Error('Error updating user: ' + error.message);
  }
};


const deleteUser = async (id) => {
  try {
    const user = await User.deleteOne({_id:id});
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

  const token = jwt.sign({ id: user._id },jwtSecret, { expiresIn: jwtExpiration });
  const refreshToken = jwt.sign({ id: user._id }, refreshJwtSecret, { expiresIn: refreshJwtExpiration});

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email
  };

  return { user: userResponse, token, refreshToken };
};
const refreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, refreshJwtSecret);
    const token = jwt.sign({ id: decoded.id }, jwtSecret, { expiresIn: jwtExpiration });
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
