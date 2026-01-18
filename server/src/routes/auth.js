import { Router } from 'express';
import User from '../models/User.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = Router();

// Demo user storage (in-memory)
const demoUsers = [];

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, class: classLevel, section, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    } catch (dbError) {
      console.log('📝 Using demo mode (no database)');
    }

    const studentId = `K_${classLevel}_${section}${Math.random().toString(36).substr(2, 9)}`;
    const demoUser = {
      _id: Date.now().toString(),
      name,
      email,
      password,
      phone,
      class: classLevel,
      section,
      studentId,
      role: role || 'student',
      createdAt: new Date(),
      toJSON: function() { 
        const obj = { ...this };
        delete obj.password;
        return obj;
      }
    };

    demoUsers.push(demoUser);
    const token = generateToken(demoUser._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: demoUser.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const demoUser = demoUsers.find(u => u.email === email);
    
    if (demoUser && demoUser.password === password) {
      const token = generateToken(demoUser._id);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: demoUser.toJSON(),
      });
      return;
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken(user._id.toString());
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: user.toJSON(),
      });
    } catch (dbError) {
      return res.status(401).json({ error: 'Invalid credentials (demo mode)' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const demoUser = demoUsers.find(u => u._id === req.userId);
    if (demoUser) {
      return res.status(200).json({ success: true, user: demoUser.toJSON() });
    }

    try {
      const user = await User.findById(req.userId);
      res.status(200).json({ success: true, user: user?.toJSON() });
    } catch (dbError) {
      res.status(200).json({ 
        success: true, 
        user: { id: req.userId, message: 'Demo mode - no database' } 
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout
router.post('/logout', authMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: 'Logout successful' });
});

export default router;
