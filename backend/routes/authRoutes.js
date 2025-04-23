const express = require('express');
const router = express.Router();
const { registerUser, generateToken } = require('../controllers/authController');
const { loginUser } = require('../controllers/loginController');

// Route for user signup
router.post('/signup', registerUser);

// Route for token generation
router.post('/token', generateToken);

router.post('/login', loginUser);

module.exports = router;