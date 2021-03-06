const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../schema/todoUser');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const dotenv = require('dotenv');

dotenv.config();

// @route   POST /api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'please enter all feilds' });
  }
  // Check for existing User
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User Does not exist' });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
      jwt.sign(
        { id: user._id },
        process.env.JWT,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              _id: user._id,
              name: user.userName,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route   GET /api/auth/user
// @desc    get user data
// @access  private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
