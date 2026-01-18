# Complete API Reference & Implementation Guide

## 📡 API Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### POST /auth/register
Register new user

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepass123",
    "phone": "9876543210",
    "class": "10",
    "section": "A"
  }
```

**JavaScript:**
```javascript
import { auth, setToken } from '@/lib/api';

const response = await auth.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securepass123',
  phone: '9876543210',
  class: '10',
  section: 'A'
});

console.log(response.token);    // JWT token
console.log(response.user);     // User object with studentId
setToken(response.token);       // Save for future requests
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65a4b2c1d9e8f7a6b5c4d3e2",
    "name": "John Doe",
    "email": "john@example.com",
    "studentId": "K_10_A123456789",
    "class": "10",
    "section": "A",
    "role": "student"
  }
}
```

---

### POST /auth/login
Login user

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d {
    "email": "john@example.com",
    "password": "securepass123"
  }
```

**JavaScript:**
```javascript
import { auth, setToken } from '@/lib/api';

const response = await auth.login('john@example.com', 'securepass123');

setToken(response.token);
console.log('Logged in as:', response.user.name);
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65a4b2c1d9e8f7a6b5c4d3e2",
    "name": "John Doe",
    "email": "john@example.com",
    "studentId": "K_10_A123456789"
  }
}
```

---

### GET /auth/me
Get current authenticated user

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**JavaScript:**
```javascript
import { auth } from '@/lib/api';

const response = await auth.getMe();
console.log(response.user);
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "65a4b2c1d9e8f7a6b5c4d3e2",
    "name": "John Doe",
    "email": "john@example.com",
    "studentId": "K_10_A123456789",
    "class": "10",
    "section": "A"
  }
}
```

---

### POST /auth/logout
Logout current user

**JavaScript:**
```javascript
import { auth, removeToken } from '@/lib/api';

await auth.logout();
removeToken();
localStorage.clear();
```

---

## 👥 Student Endpoints

### GET /students
Get all students

**JavaScript:**
```javascript
import { students } from '@/lib/api';

const response = await students.getAll();
console.log(response.data); // Array of student objects
```

---

### GET /students/:id
Get student by ID

**JavaScript:**
```javascript
const response = await students.getById('65a4b2c1d9e8f7a6b5c4d3e2');
console.log(response.data);
```

---

### PUT /students/:id
Update student info

**JavaScript:**
```javascript
const response = await students.update('65a4b2c1d9e8f7a6b5c4d3e2', {
  name: 'Jane Doe',
  phone: '9876543210',
  class: '11',
  section: 'B'
});
```

---

### DELETE /students/:id
Delete student

**JavaScript:**
```javascript
await students.delete('65a4b2c1d9e8f7a6b5c4d3e2');
```

---

## 🎯 Career Endpoints

### GET /careers
Get all careers

**JavaScript:**
```javascript
import { careers } from '@/lib/api';

const response = await careers.getAll();
console.log(response.data); // Array of careers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "65a4b2c1d9e8f7a6b5c4d3e2",
      "title": "Software Engineer",
      "description": "Build scalable applications...",
      "requirements": ["Problem solving", "Coding"],
      "salary_range": { "min": 500000, "max": 1500000 },
      "growth_rate": 15,
      "skills": ["Python", "JavaScript", "System Design"],
      "industries": ["Tech", "Finance"]
    }
  ]
}
```

---

### GET /careers/:id
Get career by ID

**JavaScript:**
```javascript
const response = await careers.getById('65a4b2c1d9e8f7a6b5c4d3e2');
console.log(response.data);
```

---

### GET /careers/search/by-skill?skill=Python
Search careers by skill

**JavaScript:**
```javascript
const response = await careers.search('Python');
console.log(response.data); // Careers requiring Python
```

---

### POST /careers
Create new career (admin only)

**JavaScript:**
```javascript
const response = await careers.create({
  title: 'Data Scientist',
  description: 'Analyze and visualize complex data...',
  requirements: ['Statistics', 'Machine Learning'],
  salary_range: { min: 600000, max: 1800000 },
  growth_rate: 20,
  education_level: 'Bachelor\'s',
  skills: ['Python', 'R', 'SQL', 'TensorFlow'],
  industries: ['Tech', 'Finance', 'Healthcare']
});
```

---

### PUT /careers/:id
Update career

**JavaScript:**
```javascript
const response = await careers.update('65a4b2c1d9e8f7a6b5c4d3e2', {
  salary_range: { min: 650000, max: 2000000 },
  growth_rate: 25
});
```

---

### DELETE /careers/:id
Delete career

**JavaScript:**
```javascript
await careers.delete('65a4b2c1d9e8f7a6b5c4d3e2');
```

---

## 📋 Assessment Endpoints

### POST /assessments
Submit personality assessment

**JavaScript:**
```javascript
import { assessments } from '@/lib/api';

const response = await assessments.create({
  scores: {
    openness: 78,
    conscientiousness: 85,
    extraversion: 65,
    agreeableness: 72,
    neuroticism: 42
  },
  answers: [
    { questionId: 'q1', answer: 'Strongly Agree' },
    { questionId: 'q2', answer: 'Agree' },
    // ... more answers
  ]
});

console.log(response.data.personalityType);     // OCEAN type
console.log(response.data.recommendedCareers);  // Array of career IDs
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a4b2c1d9e8f7a6b5c4d3e2",
    "userId": "65a4b2c1d9e8f7a6b5c4d3e2",
    "personalityType": "OCEAN",
    "scores": {
      "openness": 78,
      "conscientiousness": 85,
      "extraversion": 65,
      "agreeableness": 72,
      "neuroticism": 42
    },
    "recommendedCareers": [
      "65a4b2c1d9e8f7a6b5c4d3e3",
      "65a4b2c1d9e8f7a6b5c4d3e4"
    ],
    "completedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### GET /assessments
Get all user assessments

**JavaScript:**
```javascript
const response = await assessments.getAll();
console.log(response.data); // Array of user's assessments
```

---

### GET /assessments/:id
Get specific assessment

**JavaScript:**
```javascript
const response = await assessments.getById('65a4b2c1d9e8f7a6b5c4d3e2');
console.log(response.data);
```

---

## 🔧 Implementation Examples

### Example 1: StudentInfo Page - Add Student
```javascript
// src/pages/StudentInfo.js
import { auth, setToken } from '@/lib/api';
import { toast } from 'sonner';

const handleAddStudent = async (e) => {
  e.preventDefault();
  
  try {
    const response = await auth.register({
      name: formData.name,
      email: formData.email,
      password: 'tempPassword123', // You can ask user to set
      phone: formData.phone,
      class: formData.class,
      section: formData.section
    });

    setToken(response.token);
    setStudents([...students, response.user]);
    toast.success(`Student added: ${response.user.studentId}`);
    
  } catch (error) {
    toast.error(error.message);
  }
};
```

---

### Example 2: Auth Page - Login
```javascript
// src/pages/Auth.js
import { auth, setToken } from '@/lib/api';
import { useRouter } from 'next/router';

const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    const response = await auth.login(email, password);
    setToken(response.token);
    
    // Store user info if needed
    sessionStorage.setItem('user', JSON.stringify(response.user));
    
    router.push('/student-info');
  } catch (error) {
    toast.error('Invalid credentials');
  }
};
```

---

### Example 3: CareerVisualization - Load & Search
```javascript
// src/pages/CareerVisualization.js
import { careers } from '@/lib/api';
import { useEffect, useState } from 'react';

const CareerVisualization = () => {
  const [allCareers, setAllCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');

  useEffect(() => {
    // Load all careers on mount
    careers.getAll()
      .then(res => setAllCareers(res.data))
      .catch(err => toast.error('Failed to load careers'));
  }, []);

  const handleSearch = async (skill) => {
    setSearchSkill(skill);
    
    if (!skill.trim()) {
      setFilteredCareers(allCareers);
      return;
    }

    try {
      const res = await careers.search(skill);
      setFilteredCareers(res.data);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  return (
    // ... render careers
  );
};
```

---

### Example 4: PersonalityAssessment - Submit & Get Results
```javascript
// src/pages/PersonalityAssessment.js
import { assessments, careers } from '@/lib/api';
import { useState } from 'react';

const handleSubmitAssessment = async (answers) => {
  try {
    // Calculate OCEAN scores from answers
    const scores = calculatePersonalityScores(answers);

    // Submit to backend
    const response = await assessments.create({
      scores,
      answers
    });

    // Get recommended career details
    const careerIds = response.data.recommendedCareers;
    const careerDetails = await Promise.all(
      careerIds.map(id => careers.getById(id))
    );

    // Display recommendations
    showRecommendations(careerDetails.map(r => r.data));
    
    toast.success('Assessment completed!');
    
  } catch (error) {
    toast.error('Failed to submit assessment');
  }
};
```

---

## 🛡️ Error Handling

All API calls use the `apiCall` utility which handles errors:

```javascript
import { apiCall, students } from '@/lib/api';

try {
  const response = await students.getAll();
} catch (error) {
  // error.message contains the error from server
  console.error('Error:', error.message);
  
  // Common errors:
  // - "401 Unauthorized" → Token missing or expired
  // - "403 Forbidden" → Insufficient permissions
  // - "404 Not Found" → Resource doesn't exist
  // - "500 Internal Server Error" → Server error
}
```

---

## 🔄 Token Management

```javascript
import { getToken, setToken, removeToken } from '@/lib/api';

// Get current token
const token = getToken();

// Set token after login
setToken(response.token);

// Remove token after logout
removeToken();

// Check if user is authenticated
const isAuthenticated = !!getToken();
```

---

## 📋 Complete Flow Example

```javascript
import { auth, students, assessments, careers, setToken, getToken } from '@/lib/api';

async function completeUserJourney() {
  try {
    // 1. Register/Login
    const authRes = await auth.login('student@example.com', 'password123');
    setToken(authRes.token);
    console.log('✅ Logged in:', authRes.user.name);

    // 2. Get my profile
    const myProfile = await auth.getMe();
    console.log('✅ Profile:', myProfile.user);

    // 3. View all careers
    const allCareers = await careers.getAll();
    console.log('✅ Found', allCareers.data.length, 'careers');

    // 4. Search careers by skill
    const pythonCareers = await careers.search('Python');
    console.log('✅ Python careers:', pythonCareers.data.length);

    // 5. Take assessment
    const assessmentRes = await assessments.create({
      scores: {
        openness: 75,
        conscientiousness: 80,
        extraversion: 70,
        agreeableness: 75,
        neuroticism: 40
      },
      answers: []
    });
    console.log('✅ Assessment type:', assessmentRes.data.personalityType);
    console.log('✅ Recommended careers:', assessmentRes.data.recommendedCareers.length);

    // 6. Logout
    await auth.logout();
    removeToken();
    console.log('✅ Logged out');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}
```

---

## 🚀 Production Checklist

- [ ] Update API_BASE_URL for production
- [ ] Set secure JWT_SECRET in server .env
- [ ] Enable HTTPS in production
- [ ] Set proper CORS_ORIGIN
- [ ] Add rate limiting to API
- [ ] Enable MongoDB authentication
- [ ] Add input validation
- [ ] Set up error logging
- [ ] Add API monitoring
- [ ] Test all endpoints thoroughly
