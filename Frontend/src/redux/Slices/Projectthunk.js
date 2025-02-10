import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api.service';
import { API_CONFIG } from '../../config/api.config';

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.PROJECTS.BASE);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.PROJECTS.BASE, projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ id, projectData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(API_CONFIG.ENDPOINTS.PROJECTS.BY_ID(id), projectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.delete(API_CONFIG.ENDPOINTS.PROJECTS.BY_ID(id));
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
