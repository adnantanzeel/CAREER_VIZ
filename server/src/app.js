import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import careerRoutes from './routes/careers.js';
import assessmentRoutes from './routes/assessments.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/assessments', assessmentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Career Compass API', 
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      auth: 'POST /api/auth/register, /api/auth/login, /api/auth/logout, GET /api/auth/me',
      students: 'GET /api/students, GET /api/students/:id, PUT /api/students/:id, DELETE /api/students/:id',
      careers: 'GET /api/careers, GET /api/careers/:id, GET /api/careers/search/by-skill',
      assessments: 'POST /api/assessments, GET /api/assessments, GET /api/assessments/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`✅ MongoDB: Connected`);
  });
}).catch((error) => {
  console.warn('⚠️  MongoDB not available, starting server without database...');
  console.warn('Error:', error.message);
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`⚠️  MongoDB: Disconnected (running in demo mode)`);
    console.log(`\n📝 Demo Responses Enabled:`);
    console.log(`   - All endpoints return mock data`);
    console.log(`   - No data persistence`);
  });
});

export default app;
