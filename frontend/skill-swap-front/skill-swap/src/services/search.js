import api from '../api';

export const searchUsers = async (query) => {
    try {
        const response = await api.get('/search', { params: { query } });
        return response.data.results;
    } catch (error) {
        throw error.response?.data?.error || 'Search failed';
    }
};

export const advancedSearchUsers = async (query, skills, location) => {
    try {
        const response = await api.get('/search/advanced', { 
            params: { query, skills: skills?.join(','), location }
        });
        return response.data.results;
    } catch (error) {
        throw error.response?.data?.error || 'Advanced search failed';
    }
};
