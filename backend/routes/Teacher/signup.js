const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || "eduverse@123";

router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
  
    try {
      // 1. Check if user already exists
      const userCheck = await pool.query('SELECT * FROM teacher WHERE email = $1', [email]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // 2. Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // 3. Insert new user
      const newUser = await pool.query(
        'INSERT INTO teacher (email, password) VALUES ($1, $2) RETURNING id, email',
        [email, hashedPassword]
      );
  
      const user = newUser.rows[0];
  
      // 4. Generate JWT
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: '1h',
      });
  
      // 5. Set JWT as secure cookie
      res.cookie('token', token, {
        httpOnly: true,
        // secure: true, // use only on HTTPS
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000, // 1 h
      });
  
      // 6. Respond with success
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;