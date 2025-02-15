import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api.service';
import { API_CONFIG } from '../../config/api.config';

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.MESSAGES.BASE, messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error sending message');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.MESSAGES.BASE);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching messages');
    }
  }
);

export const replyToMessage = createAsyncThunk(
  'messages/replyToMessage',
  async ({ id, reply }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.MESSAGES.REPLY(id),
        { reply }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error replying to message');
    }
  }
);
