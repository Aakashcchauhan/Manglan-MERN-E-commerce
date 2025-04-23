const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers, getUserById } = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../middlewares/jwtMiddleware');

// Route to get all users
router.get('/all', getAllUsers);

// Route to get logged-in user's profile
router.get('/profile/:id',  getUserProfile);

// Route to update logged-in user's profile
router.put('/profile/:id', jwtAuthMiddleware, updateUserProfile);

module.exports = router;