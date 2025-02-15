import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../services/api.service';
import { API_CONFIG } from '../../config/api.config';

// Thunks
export const fetchViewCount = createAsyncThunk(
  'views/fetchCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.VIEWS.COUNT);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const incrementViewCount = createAsyncThunk(
  'views/increment',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.VIEWS.INCREMENT);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const viewSlice = createSlice({
  name: 'views',
  initialState: {
    count: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViewCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchViewCount.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count;
        state.error = null;
      })
      .addCase(fetchViewCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(incrementViewCount.fulfilled, (state, action) => {
        state.count = action.payload.count;
      });
  }
});

export default viewSlice.reducer;
