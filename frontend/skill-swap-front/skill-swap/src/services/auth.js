import api from '../api';

// Login Function
export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Login failed';
    }
};

// Register Function
export const register = async (name, email, password) => {
    try {
        const response = await api.post('/auth/register', { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Registration failed';
    }
};

// Get Current User
export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Failed to fetch user';
    }
};
