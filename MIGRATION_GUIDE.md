# Migration Guide: Supabase → MongoDB + Express

## ✅ What's Changed

### Removed:
- ❌ Supabase (@supabase/supabase-js)
- ❌ Next.js (pages/api/* now in server/src/routes/*)
- ❌ next-themes
- ❌ Bun dependency

### Added:
- ✅ Express.js backend server
- ✅ MongoDB + Mongoose
- ✅ JWT Authentication
- ✅ RESTful API Routes

---

## 🚀 Project Structure

```
career-compass/
├── client/                    ← React + Vite Frontend
│   ├── src/
│   ├── vite.config.ts
│   ├── package.json
│   └── ...
│
└── server/                    ← Node + Express Backend
    ├── src/
    │   ├── models/           (MongoDB schemas)
    │   ├── routes/           (REST API endpoints)
    │   ├── middleware/       (Auth, error handling)
    │   ├── utils/            (Database, helpers)
    │   └── app.ts            (Express server entry)
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

---

## 🔗 API Endpoints

### Auth
```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login user
POST   /api/auth/logout       - Logout
GET    /api/auth/me           - Get current user
```

### Students
```
GET    /api/students          - Get all students
GET    /api/students/:id      - Get student by ID
PUT    /api/students/:id      - Update student
DELETE /api/students/:id      - Delete student
```

### Careers
```
GET    /api/careers           - Get all careers
GET    /api/careers/:id       - Get career by ID
GET    /api/careers/search/by-skill - Search by skill
POST   /api/careers           - Create career
PUT    /api/careers/:id       - Update career
DELETE /api/careers/:id       - Delete career
```

### Assessments
```
GET    /api/assessments       - Get user's assessments
GET    /api/assessments/:id   - Get assessment by ID
POST   /api/assessments       - Create new assessment
```

---

## 📝 Replacement: Supabase Calls → Fetch()

### Before (Supabase)
```javascript
import { supabase } from "@/integrations/supabase/client";

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

// Get data
const { data: students } = await supabase
  .from('students')
  .select('*');

// Insert
const { data: newStudent } = await supabase
  .from('students')
  .insert([{ name, email }]);
```

### After (Express API)
```javascript
import { auth, students, apiCall } from '@/lib/api';

// Login
const { token, user } = await auth.login(email, password);
localStorage.setItem('authToken', token);

// Get data
const { data } = await students.getAll();

// Create
const { data: newStudent } = await students.create({ name, email });
```

---

## 🔐 Authentication Flow

### 1. Register
```javascript
import { auth, setToken } from '@/lib/api';

const { token, user } = await auth.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securepass123',
  class: '10',
  section: 'A'
});

setToken(token); // Store JWT
```

### 2. Login
```javascript
const { token, user } = await auth.login('john@example.com', 'securepass123');
setToken(token);
```

### 3. Protected Requests
```javascript
// Automatically adds Authorization header
const { data } = await students.getById('userId');
```

### 4. Logout
```javascript
await auth.logout();
localStorage.removeItem('authToken');
```

---

## 🛠️ Setup Instructions

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with MongoDB URI
npm run dev
```

### Frontend Setup (Client)
```bash
npm install
npm run dev
```

---

## 📊 MongoDB Schemas

### User
```typescript
{
  name: string
  email: string (unique)
  password: string (hashed)
  phone?: string
  class?: string
  section?: string
  studentId: string (unique)
  role: 'student' | 'admin'
  createdAt: Date
  updatedAt: Date
}
```

### Career
```typescript
{
  title: string (unique)
  description: string
  requirements: string[]
  salary_range: { min, max }
  growth_rate: number
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
  userId: ObjectId (ref: User)
  personalityType: string
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

### Resume
```typescript
{
  userId: ObjectId (ref: User)
  title: string
  content: string
  skills: string[]
  education: [{ school, degree, field, startDate, endDate }]
  experience: [{ company, position, startDate, endDate, description }]
  createdAt: Date
  updatedAt: Date
}
```

---

## 🎯 Frontend Integration Examples

### StudentInfo.js - Registration
```javascript
import { auth, setToken } from '@/lib/api';

const handleAddStudent = async (formData) => {
  try {
    const { token, user } = await auth.register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      class: formData.class,
      section: formData.section,
    });
    
    setToken(token);
    toast.success(`Student added with ID: ${user.studentId}`);
  } catch (error) {
    toast.error(error.message);
  }
};
```

### Auth.js - Login
```javascript
import { auth, setToken } from '@/lib/api';

const handleLogin = async (email, password) => {
  try {
    const { token, user } = await auth.login(email, password);
    setToken(token);
    router.push('/student-info');
  } catch (error) {
    toast.error('Login failed');
  }
};
```

### CareerVisualization.js - Fetch Careers
```javascript
import { careers } from '@/lib/api';

useEffect(() => {
  careers.getAll()
    .then(res => setCareers(res.data))
    .catch(err => toast.error('Failed to load careers'));
}, []);
```

### PersonalityAssessment.js - Submit Assessment
```javascript
import { assessments } from '@/lib/api';

const handleSubmit = async (answers) => {
  try {
    const scores = calculateScores(answers);
    const result = await assessments.create({ scores, answers });
    
    toast.success('Assessment submitted!');
    // Recommended careers are in result.data.recommendedCareers
  } catch (error) {
    toast.error('Failed to submit assessment');
  }
};
```

---

## ⚠️ Environment Variables

### Client (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-compass
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 🚀 Running the Project

### Terminal 1 - Backend
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## ✨ UI Remains 100% Identical

- ✅ All components unchanged
- ✅ All pages unchanged
- ✅ All styling unchanged
- ✅ Only backend integration changed
- ✅ Same user experience

---

## 🔄 API Client Usage

Import from `@/lib/api`:

```javascript
import { 
  auth, 
  students, 
  careers, 
  assessments,
  setToken,
  getToken,
  removeToken
} from '@/lib/api';

// Auth
await auth.register(data);
await auth.login(email, password);
await auth.logout();

// Students
await students.getAll();
await students.getById(id);
await students.update(id, data);
await students.delete(id);

// Careers
await careers.getAll();
await careers.search(skill);

// Assessments
await assessments.create(data);
await assessments.getAll();
```

---

## 📦 MongoDB Installation

### Windows (via WSL2 or Docker)
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Or Local Install
```bash
# Download from https://www.mongodb.com/try/download/community
# Install and run mongod
```

---

## ✅ Checklist

- [x] Backend server created (Express + MongoDB)
- [x] MongoDB schemas defined
- [x] REST API routes implemented
- [x] JWT authentication added
- [x] API client utility created (@/lib/api)
- [x] Supabase removed from package.json
- [x] Next.js removed
- [x] Frontend UI unchanged
- [ ] Test all API endpoints
- [ ] Deploy backend to production

---

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### "CORS Error"
- Check CORS_ORIGIN in server .env
- Should match your frontend URL

### "401 Unauthorized"
- Token missing or invalid
- Check Authorization header
- Re-login to get new token

### "Port already in use"
- Change PORT in server .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB/Mongoose](https://mongoosejs.com/)
- [JWT Auth](https://jwt.io/)
- [Vite Docs](https://vitejs.dev/)
