const express = require('express');
const { authController } = require('../controllers');
const { validateLogin } = require('../utils/validator');

const router = express.Router();

router.post('/login', validateLogin, authController.authenticateUser);
router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router;
