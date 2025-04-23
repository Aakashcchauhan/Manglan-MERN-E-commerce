const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtUtils');

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body; // Include role in the request body

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check lockout
    if (user.isLocked()) {
      const waitSeconds = Math.ceil((user.lockUntil - Date.now()) / 1000);
      return res.status(403).json({
        error: `Account locked. Try again in ${waitSeconds}s.`,
        lockTimeRemaining: waitSeconds,
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      user.loginAttempts += 1;

      if (user.loginAttempts >= 3) {
        user.lockCount += 1;
        const newLockTime = 30000 * user.lockCount;

        user.lockUntil = new Date(Date.now() + newLockTime);
        user.loginAttempts = 0;
        await user.save();

        return res.status(403).json({
          error: `Too many failed attempts. Locked for ${newLockTime / 1000} seconds.`,
          lockTimeRemaining: newLockTime / 1000,
        });
      }

      await user.save();
      const attemptsLeft = 3 - user.loginAttempts;
      return res.status(401).json({
        error: `Invalid credentials. ${attemptsLeft} attempts left.`,
        attemptsLeft,
      });
    }
    
    // If login successful
    user.loginAttempts = 0;
    user.lockUntil = null;
    user.lockCount = 0;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
