import { Router } from 'express';
import Career from '../models/Career.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Get all careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get career by ID
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get careers by skill
router.get('/search/by-skill', async (req, res) => {
  try {
    const { skill } = req.query;
    const careers = await Career.find({ skills: skill });
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create career (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, requirements, salary_range, education_level, skills, industries } = req.body;

    const career = new Career({
      title,
      description,
      requirements,
      salary_range,
      education_level,
      skills,
      industries,
    });

    await career.save();
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update career
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete career
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    res.status(200).json({ success: true, message: 'Career deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
