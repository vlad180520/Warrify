import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    // const { userId, email, username, firstName, lastName, password, dateOfBirth } = req.body;
    const { username, email, password, terms} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    // const user = new User({ userId, email, username, firstName, lastName, password, dateOfBirth });
    const user = new User({ username, email, password, terms });
    await user.save();

    // Generate access token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate access token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;