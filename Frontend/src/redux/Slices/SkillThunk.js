import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api.service';
import { API_CONFIG } from '../../config/api.config';

export const fetchSkills = createAsyncThunk(
  'skills/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.SKILLS.BASE);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createSkill = createAsyncThunk(
  'skills/create',
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.SKILLS.BASE, skillData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateSkill = createAsyncThunk(
  'skills/update',
  async ({ id, skillData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_CONFIG.ENDPOINTS.SKILLS.BY_ID(id), skillData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteSkill = createAsyncThunk(
  'skills/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.delete(API_CONFIG.ENDPOINTS.SKILLS.BY_ID(id));
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
