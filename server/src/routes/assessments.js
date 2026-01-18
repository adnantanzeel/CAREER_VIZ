import { Router } from 'express';
import Assessment from '../models/Assessment.js';
import Career from '../models/Career.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Get user assessments
router.get('/', authMiddleware, async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.userId }).populate('recommendedCareers');
    res.status(200).json({ success: true, data: assessments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single assessment
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id).populate('recommendedCareers');
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.status(200).json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create assessment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { scores, answers } = req.body;

    // Calculate personality type from scores
    const personalityType = calculatePersonalityType(scores);

    // Get recommended careers based on personality
    const recommendedCareers = await getRecommendedCareers(scores);

    const assessment = new Assessment({
      userId: req.userId,
      personalityType,
      scores,
      answers,
      recommendedCareers: recommendedCareers.map((c) => c._id),
      completedAt: new Date(),
    });

    await assessment.save();
    res.status(201).json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to calculate personality type
function calculatePersonalityType(scores) {
  const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = scores;
  
  return [
    openness > 50 ? 'O' : 'C',
    conscientiousness > 50 ? 'C' : 'D',
    extraversion > 50 ? 'E' : 'I',
    agreeableness > 50 ? 'A' : 'S',
    neuroticism > 50 ? 'N' : 'S',
  ].join('');
}

// Helper function to get recommended careers
async function getRecommendedCareers(scores) {
  const careers = await Career.find();
  // Sort by match score (simplified)
  return careers.slice(0, 5);
}

export default router;
