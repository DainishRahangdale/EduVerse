const express = require('express');
const router = express.Router();
const signup = require('./Student/signup');
const login = require('./Student/login');


router.use('/login', login);
router.use('/signup', signup);



module.exports = router;