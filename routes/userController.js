// Imports
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')


router.post('/register', userController.user_register);

router.post('/login', userController.user_login);

router.get('/getUserProfile', userController.user_get_user_profile);

router.get('/getAllUsers', userController.user_get_all_users);

router.patch('/updateUser', userController.user_update_current_user);

router.patch('/:idUser', userController.user_update_user_by_id);

router.delete('/', userController.user_delete_current_user);

router.delete('/:id', userController.user_delete_user_by_id);

module.exports = router;