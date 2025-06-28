const express = require('express');
const router = express.Router();
const signup = require('./Student/signup');
const login = require('./Student/login');
const resetPassword= require('./Student/reset-password');

router.use('/login', login);
router.use('/signup', signup);
router.use('/reset-password', resetPassword);


module.exports = router;