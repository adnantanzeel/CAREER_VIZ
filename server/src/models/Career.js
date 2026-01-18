import mongoose, { Schema } from 'mongoose';

const careerSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    requirements: [String],
    salary_range: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    growth_rate: { type: Number, default: 0 },
    education_level: String,
    skills: [String],
    industries: [String],
    job_outlook: String,
  },
  { timestamps: true }
);

export default mongoose.model('Career', careerSchema);
