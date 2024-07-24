const { userService } = require('../services');
const responseFormatter = require('../utils/responseFormatter');

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await userService.authenticateUser(email, password);
    res.json(responseFormatter.formatResponse('Authentication successful', { user, token, refreshToken }));
  } catch (error) {
    res.status(401).json(responseFormatter.formatError(error.message));
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const token = await userService.refreshToken(refreshToken);
    res.json(responseFormatter.formatResponse('Token refreshed successfully', { token }));
  } catch (error) {
    res.status(401).json(responseFormatter.formatError(error.message));
  }
};

module.exports = {
  authenticateUser,
  refreshAccessToken,
};
