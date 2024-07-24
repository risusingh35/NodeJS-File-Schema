const express = require('express');
const { userController } = require('../controllers');
const { validateUserCreation } = require('../../utils/validator');
const router = express.Router();

router.post('/', validateUserCreation, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validateUserCreation, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
