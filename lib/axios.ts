import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1', // Адрес твоего Django
    headers: {
        'Content-Type': 'application/json',
    },
});

// Автоматически добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
    // В реальном проекте токен лучше хранить в cookies или localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
