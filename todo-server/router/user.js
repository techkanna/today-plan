const express = require('express');
const Router = express.Router();
const UserModel = require('../schema/todoUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// @route   POST api/user/
// @desc    Add new user
// @access  Public
Router.post('/', (req, res) => {
  const { userName, email, password } = req.body;
  // console.log(req.body);
  if (!userName || !email || !password)
    return res
      .status(400)
      .json({ msg: 'please fill all the fields to continue' });

  // check for existing user
  UserModel.findOne({ email: email }, (e, user) => {
    if (e) return e;

    if (user) return res.status(400).json({ msg: 'user already exist...' });

    const newUser = new UserModel({ userName, email, password });

    bcrypt.genSalt(10, (e, salt) => {
      if (e) return e;
      bcrypt.hash(password, salt, (e, hash) => {
        if (e) return e;
        newUser.password = hash;
        newUser.save((e, user) => {
          if (e) return e;
          jwt.sign(
            { id: user._id },
            process.env.JWT,
            { expiresIn: '1h' },
            (e, token) => {
              if (e) return e;
              return res.status(201).json({
                token,
                user: {
                  _id: user._id,
                  userName: user.userName,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = Router;
