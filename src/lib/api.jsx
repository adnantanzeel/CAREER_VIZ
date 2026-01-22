// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getToken = () => localStorage.getItem('authToken');
export const setToken = (token) => localStorage.setItem('authToken', token);
export const removeToken = () => localStorage.removeItem('authToken');

export const apiCall = async (
  endpoint,
  method = 'GET',
  body = null
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ========== AUTH APIs ==========
export const auth = {
  register: (userData) => apiCall('/auth/register', 'POST', userData),
  login: (email, password) =>
    apiCall('/auth/login', 'POST', { email, password }),
  logout: () => apiCall('/auth/logout', 'POST'),
  getMe: () => apiCall('/auth/me'),
};

// ========== STUDENT APIs ==========
export const students = {
  getAll: () => apiCall('/students'),
  getById: (id) => apiCall(`/students/${id}`),
  update: (id, data) => apiCall(`/students/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/students/${id}`, 'DELETE'),
};

// ========== CAREER APIs ==========
export const careers = {
  getAll: () => apiCall('/careers'),
  getById: (id) => apiCall(`/careers/${id}`),
  search: (skill) => apiCall(`/careers/search/by-skill?skill=${skill}`),
  create: (data) => apiCall('/careers', 'POST', data),
  update: (id, data) => apiCall(`/careers/${id}`, 'PUT', data),
  delete: (id) => apiCall(`/careers/${id}`, 'DELETE'),
};

// ========== ASSESSMENT APIs ==========
export const assessments = {
  getAll: () => apiCall('/assessments'),
  getById: (id) => apiCall(`/assessments/${id}`),
  create: (data) => apiCall('/assessments', 'POST', data),
};
