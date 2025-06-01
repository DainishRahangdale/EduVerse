const express = require('express');
const authenticate = require('../middlewares/authentication');
const router = express.Router();


router.get('/',authenticate, (req, res) => {
      res.send('validation success');
  });
  


module.exports = router;