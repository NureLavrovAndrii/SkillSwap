import api from '../api';

export const getProfile = async (userId) => {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/profile', profileData);
    return response.data;
};

export const uploadProfilePicture = async (filePath) => {
    const formData = new FormData();
    formData.append('profilePicture', filePath);

    const response = await api.post('/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
};