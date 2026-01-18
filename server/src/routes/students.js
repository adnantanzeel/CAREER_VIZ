import { Router } from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all students (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.userId !== req.params.id && req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { name, email, phone, class: classLevel, section } = req.body;
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, class: classLevel, section },
      { new: true }
    ).select('-password');

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete student
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can delete students' });
    }

    const student = await User.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ success: true, message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
