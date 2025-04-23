const User = require('../models/UserSchema');
const bcrypt = require('bcryptjs');

const { generateToken } = require('../utils/jwtUtils');

// User registration
exports.registerUser = async (req, res) => {
    const { firstname, lastname, email, password} = req.body;

    if (!firstname || !lastname || !email || !password ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newUser = new User({ firstname, lastname, email, password});
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Token generation
exports.generateToken = (userId) => {
    return generateToken(userId);
};