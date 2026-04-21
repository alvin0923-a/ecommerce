const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/admin/login
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Find admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await admin.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
