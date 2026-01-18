# Quick Reference Card

## 🚀 Start Here (5 Minutes)

### Step 1: Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env - add MongoDB URI
npm run dev
```

### Step 2: Frontend Setup (New Terminal)
```bash
npm install
npm run dev
```

**Done!** Frontend on `http://localhost:5173` | Backend on `http://localhost:5000`

---

## 📡 API Quick Reference

### Auth
```javascript
import { auth, setToken, removeToken } from '@/lib/api';

// Register
const { token, user } = await auth.register({
  name, email, password, class: '10', section: 'A'
});
setToken(token);

// Login
const { token, user } = await auth.login(email, password);
setToken(token);

// Logout
await auth.logout();
removeToken();

// Get me
const user = await auth.getMe();
```

### Students
```javascript
import { students } from '@/lib/api';

students.getAll()              // Get all
students.getById(id)           // Get one
students.update(id, data)      // Update
students.delete(id)            // Delete
```

### Careers
```javascript
import { careers } from '@/lib/api';

careers.getAll()               // Get all
careers.getById(id)            // Get one
careers.search('Python')       // Search by skill
careers.create(data)           // Create
careers.update(id, data)       // Update
careers.delete(id)             // Delete
```

### Assessments
```javascript
import { assessments } from '@/lib/api';

assessments.create({
  scores: { openness: 75, conscientiousness: 80, ... },
  answers: [ ... ]
})

assessments.getAll()           // Get all
assessments.getById(id)        // Get one
```

---

## 🔐 Token Management

```javascript
import { getToken, setToken, removeToken } from '@/lib/api';

// Store after login
setToken(token);

// Get for manual use
const token = getToken();

// Remove after logout
removeToken();

// Check if logged in
if (getToken()) { /* user is authenticated */ }
```

---

## 📝 Example: Complete Flow

```javascript
import { auth, students, assessments, setToken } from '@/lib/api';

// 1. Register
const reg = await auth.register({
  name: 'John', email: 'john@ex.com', password: 'pass',
  class: '10', section: 'A'
});
setToken(reg.token);

// 2. Get current user
const me = await auth.getMe();
console.log(me.user.studentId); // K_10_A...

// 3. Get all students
const all = await students.getAll();

// 4. Take assessment
const result = await assessments.create({
  scores: { openness: 75, conscientiousness: 80, extraversion: 60, agreeableness: 70, neuroticism: 40 },
  answers: []
});
console.log(result.data.recommendedCareers); // Career IDs

// 5. Logout
await auth.logout();
```

---

## ⚙️ Configuration

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-compass
JWT_SECRET=your_secret_key
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 🆘 Common Errors

| Error | Solution |
|-------|----------|
| Cannot connect to API | Backend not running: `cd server && npm run dev` |
| CORS Error | Check CORS_ORIGIN in server/.env |
| 401 Unauthorized | Token missing/expired, re-login |
| Cannot find MongoDB | Start MongoDB: `mongod` or Docker |
| Port 5000 in use | Kill: `lsof -ti:5000 \| xargs kill -9` |
| Import error api.ts | Restart dev server |

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/lib/api.ts` | API client - USE THIS! |
| `server/src/app.ts` | Backend entry point |
| `server/.env` | Server secrets |
| `.env.local` | Frontend config |
| `MIGRATION_GUIDE.md` | Full migration docs |
| `API_REFERENCE.md` | Detailed API docs |

---

## 🔗 Endpoints

```
GET    /api/health
GET    /api/auth/me
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

GET    /api/students
GET    /api/students/:id
PUT    /api/students/:id
DELETE /api/students/:id

GET    /api/careers
GET    /api/careers/:id
GET    /api/careers/search/by-skill?skill=Python
POST   /api/careers
PUT    /api/careers/:id
DELETE /api/careers/:id

POST   /api/assessments
GET    /api/assessments
GET    /api/assessments/:id
```

---

## ✅ Checklist

- [ ] Backend installed: `cd server && npm install`
- [ ] .env configured with MongoDB URI
- [ ] Frontend installed: `npm install`
- [ ] Backend running: `cd server && npm run dev`
- [ ] Frontend running: `npm run dev` (new terminal)
- [ ] Test login at http://localhost:5173
- [ ] Check API_REFERENCE.md for details

---

## 🎯 Key Rules

✅ **DO**: Use `src/lib/api.ts` for all API calls
❌ **DON'T**: Use Supabase (it's removed)
✅ **DO**: Store token with `setToken(token)`
❌ **DON'T**: Make fetch requests directly
✅ **DO**: Check MIGRATION_GUIDE.md for questions
❌ **DON'T**: Edit Next.js files (they're removed)

---

## 📊 Data Models

### User
```javascript
{
  _id, name, email, password, phone, class, section,
  studentId, role ('student'|'admin'), createdAt, updatedAt
}
```

### Career
```javascript
{
  _id, title, description, requirements, salary_range,
  growth_rate, education_level, skills, industries,
  job_outlook, createdAt, updatedAt
}
```

### Assessment
```javascript
{
  _id, userId, personalityType, scores, recommendedCareers,
  answers, completedAt, createdAt, updatedAt
}
```

---

## 🚀 Next: Production

```bash
# Build frontend
npm run build

# Deploy backend to Heroku
heroku create your-app
git push heroku main

# Deploy frontend to Vercel
vercel
```

---

**Questions? Check MIGRATION_GUIDE.md or API_REFERENCE.md**

**Ready to code! 🎉**
