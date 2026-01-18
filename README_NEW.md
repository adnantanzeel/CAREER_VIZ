# Career Compass - Full Stack Application

## 🎯 Project Overview

Career Compass is an AI-powered career guidance application for Indian students. It provides:
- **Personality Assessment**: OCEAN-based personality evaluation
- **Career Recommendations**: AI-driven career path suggestions
- **Career Database**: Comprehensive Indian job market data
- **Voice Interaction**: Voice-powered career assistance
- **Student Management**: Track student information and progress

---

## 📁 Project Structure

```
career-compass/
├── 📂 client/                          ← Frontend (React + Vite)
│   ├── src/
│   │   ├── components/                 (UI components)
│   │   ├── pages/                      (Page components)
│   │   │   ├── Welcome.js
│   │   │   ├── Auth.js
│   │   │   ├── StudentInfo.js
│   │   │   ├── PersonalityAssessment.js
│   │   │   ├── CareerVisualization.js
│   │   │   └── NotFound.js
│   │   ├── lib/
│   │   │   ├── api.ts                  (API client - USE THIS!)
│   │   │   └── utils.ts
│   │   ├── hooks/
│   │   ├── integrations/
│   │   ├── App.js
│   │   ├── main.js
│   │   └── index.css
│   ├── public/
│   ├── vite.config.ts
│   ├── package.json
│   └── .env.local
│
├── 📂 server/                          ← Backend (Express + MongoDB)
│   ├── src/
│   │   ├── models/                     (MongoDB schemas)
│   │   │   ├── User.ts
│   │   │   ├── Career.ts
│   │   │   ├── Assessment.ts
│   │   │   └── Resume.ts
│   │   ├── routes/                     (API endpoints)
│   │   │   ├── auth.ts
│   │   │   ├── students.ts
│   │   │   ├── careers.ts
│   │   │   └── assessments.ts
│   │   ├── middleware/
│   │   │   └── auth.ts                 (JWT authentication)
│   │   ├── utils/
│   │   │   └── db.ts                   (MongoDB connection)
│   │   └── app.ts                      (Express server entry)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .env
│
├── 📄 MIGRATION_GUIDE.md                (Supabase → MongoDB)
├── 📄 API_REFERENCE.md                  (Complete API docs)
├── 📄 README.md                         (This file)
├── 📄 setup.sh                          (Automatic setup)
└── 📄 package.json                      (Frontend)
```

---

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)
```bash
# Run setup script
bash setup.sh

# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
npm run dev
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

#### Frontend Setup
```bash
npm install
npm run dev
```

---

## 🔗 API Endpoints

### 🔐 Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user
POST   /api/auth/logout         - Logout
```

### 👥 Students
```
GET    /api/students            - Get all students
GET    /api/students/:id        - Get student by ID
PUT    /api/students/:id        - Update student
DELETE /api/students/:id        - Delete student
```

### 🎯 Careers
```
GET    /api/careers             - Get all careers
GET    /api/careers/:id         - Get career by ID
GET    /api/careers/search/by-skill - Search by skill
POST   /api/careers             - Create career (admin)
PUT    /api/careers/:id         - Update career
DELETE /api/careers/:id         - Delete career
```

### 📋 Assessments
```
POST   /api/assessments         - Submit assessment
GET    /api/assessments         - Get user's assessments
GET    /api/assessments/:id     - Get assessment by ID
```

---

## 💻 Using the API Client

The frontend has a pre-configured API client in `src/lib/api.ts`. Use it like this:

```javascript
import { auth, students, careers, assessments, setToken, getToken } from '@/lib/api';

// Login
const { token, user } = await auth.login('email@example.com', 'password');
setToken(token);

// Get all students
const { data } = await students.getAll();

// Get careers
const { data: careerList } = await careers.getAll();

// Submit assessment
const { data: result } = await assessments.create({
  scores: { openness: 75, conscientiousness: 80, ... },
  answers: [ ... ]
});
```

**Never** use `supabase` directly - it's been removed! Always use the API client.

---

## 🛠️ Key Technologies

### Frontend
- **React** 18.3.1 - UI library
- **Vite** 5.4.19 - Fast build tool
- **TypeScript** 5.8.3 - Type safety
- **Tailwind CSS** 3.4.19 - Styling
- **shadcn/ui** - Component library
- **React Query** - Data fetching
- **Sonner** - Toast notifications
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express** 4.18.2 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.0.0 - ODM
- **JWT** - Authentication
- **TypeScript** - Type safety
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

---

## 🔐 Authentication Flow

### 1. Register New Student
```javascript
import { auth, setToken } from '@/lib/api';

const response = await auth.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securepass',
  class: '10',
  section: 'A'
});

setToken(response.token);
// User automatically gets studentId: K_10_A123456789
```

### 2. Login
```javascript
const response = await auth.login('john@example.com', 'securepass');
setToken(response.token);
```

### 3. Protected Requests
All subsequent requests automatically include the JWT token in the Authorization header.

### 4. Logout
```javascript
await auth.logout();
localStorage.removeItem('authToken');
```

---

## 📊 MongoDB Schemas

### User
```typescript
{
  _id: ObjectId
  name: string
  email: string (unique)
  password: string (hashed)
  phone?: string
  class?: string
  section?: string
  studentId: string (unique, generated)
  role: 'student' | 'admin'
  createdAt: Date
  updatedAt: Date
}
```

### Career
```typescript
{
  _id: ObjectId
  title: string
  description: string
  requirements: string[]
  salary_range: { min, max }
  growth_rate: number (0-100)
  education_level: string
  skills: string[]
  industries: string[]
  job_outlook: string
  createdAt: Date
  updatedAt: Date
}
```

### Assessment
```typescript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  personalityType: string (OCEAN)
  scores: {
    openness: 0-100
    conscientiousness: 0-100
    extraversion: 0-100
    agreeableness: 0-100
    neuroticism: 0-100
  }
  recommendedCareers: ObjectId[] (ref: Career)
  answers: { questionId, answer }[]
  completedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔄 Replaced Supabase Calls

### Before: Supabase
```javascript
import { supabase } from "@/integrations/supabase/client";

const { data } = await supabase.auth.signInWithPassword({
  email, password
});

const { data: students } = await supabase
  .from('students')
  .select('*');
```

### After: Express API
```javascript
import { auth, students } from '@/lib/api';

const { token, user } = await auth.login(email, password);

const { data } = await students.getAll();
```

---

## 📝 Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-compass
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 🧪 Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "class": "10",
    "section": "A"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "test123"}'

# Get careers
curl http://localhost:5000/api/careers
```

### Using Postman
1. Import API endpoints
2. Set Authorization header with token
3. Test each endpoint

---

## 🐛 Troubleshooting

### "Cannot GET /api/..."
- Backend not running: `cd server && npm run dev`
- Check API_BASE_URL in frontend .env.local

### "CORS Error"
- Ensure backend CORS_ORIGIN matches frontend URL
- Check server .env

### "MongoDB connection failed"
- MongoDB not running: `mongod`
- Incorrect MONGODB_URI in .env

### "401 Unauthorized"
- Token missing or expired
- Re-login to get new token

### "Port already in use"
- Change PORT in server .env or kill process
- On Mac/Linux: `lsof -ti:5000 | xargs kill -9`
- On Windows: `netstat -ano | findstr :5000`

---

## 📚 Documentation Files

- **MIGRATION_GUIDE.md** - Complete migration from Supabase to MongoDB
- **API_REFERENCE.md** - Detailed API documentation with examples
- **This README.md** - Project overview and quick start

---

## ✨ Features

✅ **Student Registration** - Easy sign-up with auto-generated student IDs
✅ **Personality Assessment** - OCEAN personality evaluation
✅ **Career Recommendations** - AI-powered career path suggestions
✅ **Career Database** - Browse Indian job market
✅ **Secure Authentication** - JWT-based auth with password hashing
✅ **Responsive Design** - Works on all devices
✅ **Real-time Updates** - Assessment results available immediately

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ CORS protection
- ✅ Input validation
- ✅ Role-based access control (student/admin)

---

## 📦 Deployment

### Heroku (Backend)
```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Vercel (Frontend)
```bash
# Deploy Vite app to Vercel
vercel
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review MIGRATION_GUIDE.md or API_REFERENCE.md
3. Check console errors (Ctrl+Shift+J in browser)

---

## 🎯 Next Steps

- [ ] Set up MongoDB
- [ ] Configure environment variables
- [ ] Start backend server
- [ ] Start frontend development server
- [ ] Test authentication flow
- [ ] Test career search
- [ ] Test personality assessment
- [ ] Deploy to production

---

**Happy coding! 🚀**
