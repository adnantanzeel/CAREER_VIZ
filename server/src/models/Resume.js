import mongoose, { Schema } from 'mongoose';

const resumeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    content: String,
    skills: [String],
    education: [
      {
        school: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Resume', resumeSchema);
