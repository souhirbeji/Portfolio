import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api.service';
import { API_CONFIG } from '../../config/api.config';

export const fetchExperiences = createAsyncThunk(
  'experiences/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.EXPERIENCES.BASE);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createExperience = createAsyncThunk(
  'experiences/create',
  async (experienceData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.EXPERIENCES.BASE, experienceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateExperience = createAsyncThunk(
  'experiences/update',
  async ({ id, experienceData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_CONFIG.ENDPOINTS.EXPERIENCES.BY_ID(id), experienceData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  'experiences/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.delete(API_CONFIG.ENDPOINTS.EXPERIENCES.BY_ID(id));
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
