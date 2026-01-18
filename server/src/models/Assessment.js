import mongoose, { Schema } from 'mongoose';

const assessmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    personalityType: String,
    scores: {
      openness: { type: Number, min: 0, max: 100 },
      conscientiousness: { type: Number, min: 0, max: 100 },
      extraversion: { type: Number, min: 0, max: 100 },
      agreeableness: { type: Number, min: 0, max: 100 },
      neuroticism: { type: Number, min: 0, max: 100 },
    },
    recommendedCareers: [{ type: Schema.Types.ObjectId, ref: 'Career' }],
    answers: [
      {
        questionId: String,
        answer: mongoose.Schema.Types.Mixed,
      },
    ],
    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Assessment', assessmentSchema);
