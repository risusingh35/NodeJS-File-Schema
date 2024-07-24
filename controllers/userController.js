const { userService } = require('../services');
const { responseFormatter,logger  } = require('../utils');

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(responseFormatter.formatResponse(user, 'User created successfully'));
    logger.info(`User created: ${user.email}`);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).json(responseFormatter.formatError(error.message));
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(responseFormatter.formatResponse(users, 'Users fetched successfully'));
  } catch (error) {
    res.status(500).json(responseFormatter.formatError(error.message));
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(responseFormatter.formatResponse(user, 'User fetched successfully'));
  } catch (error) {
    res.status(500).json(responseFormatter.formatError(error.message));
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(responseFormatter.formatResponse(user, 'User updated successfully'));
  } catch (error) {
    res.status(500).json(responseFormatter.formatError(error.message));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.json(responseFormatter.formatResponse(user, 'User deleted successfully'));
  } catch (error) {
    res.status(500).json(responseFormatter.formatError(error.message));
  }
};
