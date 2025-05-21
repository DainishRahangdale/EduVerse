const express = require('express');
const router = express.Router();
const login = require('./Teacher/login');
const signup = require('./Teacher/signup');


router.use('/login', login);
router.use('/signup', signup);


router.post('/', async (req, res)=>{
     
     const {email, password} = req.body;

     console.log(email, password);

     res.status(200).send({message:"use data recieve successfully"});
     
});

module.exports = router;