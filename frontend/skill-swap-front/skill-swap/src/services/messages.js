import api from '../api';
import socket from '../socket';

// Send message via REST API
export const sendMessage = async (receiverId, content) => {
    const response = await api.post('/messages', { receiverId, content });
    return response.data;
};

// Listen for real-time messages
export const setupMessageListener = (onMessageReceived) => {
    socket.on('newMessage', (message) => {
        onMessageReceived(message);
    });
};

// Send message via WebSockets
export const sendMessageRealtime = (senderId, receiverId, content) => {
    socket.emit('sendMessage', { senderId, receiverId, content });
};