const express = require('express');
const router = express.Router();
const signup = require('./Student/signup');
const login = require('./Student/login');
const resetPassword= require('./Student/reset-password');
const payment = require('./Student/payment');

router.use('/login', login);
router.use('/signup', signup);
router.use('/reset-password', resetPassword);
router.use('/payment', payment);


module.exports = router;