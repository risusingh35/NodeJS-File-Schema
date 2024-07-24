const { body, validationResult } = require('express-validator');

// Middleware for validating user data
const validateUserCreation = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  
  body('email')
    .isEmail().withMessage('Email is invalid')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }
    next();
  }
];

// Middleware for validating login data
const validateLogin = [
  body('email')
    .isEmail().withMessage('Email is invalid')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array(),
      });
    }
    next();
  }
];

module.exports = {
  validateUserCreation,
  validateLogin,
};
