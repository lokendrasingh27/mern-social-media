const express = require('express');
const {check} = require('express-validator');
const {registerUser , loginUser} = require('../controllers/authController.js');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  registerUser
);

router.post('/login',
   [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
], 
loginUser);


module.exports= router;
