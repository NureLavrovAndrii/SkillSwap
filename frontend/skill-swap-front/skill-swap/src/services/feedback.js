import api from '../api';

export const submitFeedback = async (recipientId, rating, comment) => {
    const response = await api.post('/feedback', { recipientId, rating, comment });
    return response.data;
};

export const getFeedbackForUser = async (userId) => {
    const response = await api.get(`/feedback/${userId}`);
    return response.data;
};

export const getAverageRating = async (userId) => {
    const response = await api.get(`/feedback/${userId}/average`);
    return response.data;
};