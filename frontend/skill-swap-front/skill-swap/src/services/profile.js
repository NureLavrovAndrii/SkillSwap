import api from '../api';

export const getProfile = async (userId) => {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put('/profile', {
        ...profileData,
        skills: profileData.skills.split(',').map(skill => skill.trim()), // Ensure skills is an array
        socialLinks: {
            github: profileData.links.split(',')[0]?.trim() || "",
            linkedin: profileData.links.split(',')[1]?.trim() || "",
            website: profileData.links.split(',')[2]?.trim() || ""
        }
    });
    return response.data;
};

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    const response = await api.post('/profile/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
};