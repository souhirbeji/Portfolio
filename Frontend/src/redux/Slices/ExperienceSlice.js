import { createSlice } from '@reduxjs/toolkit';
import { fetchExperiences, createExperience, updateExperience, deleteExperience } from './ExperienceThunk';

const initialState = {
  experiences: [],
  loading: false,
  error: null
};

const experienceSlice = createSlice({
  name: 'experiences',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Experiences
      .addCase(fetchExperiences.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = action.payload;
        state.error = null;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch experiences';
      })
      // Create Experience
      .addCase(createExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences.push(action.payload);
        state.error = null;
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create experience';
      })
      // Update Experience
      .addCase(updateExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.experiences.findIndex(exp => exp._id === action.payload._id);
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update experience';
      })
      // Delete Experience
      .addCase(deleteExperience.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences = state.experiences.filter(exp => exp._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete experience';
      });
  }
});

export default experienceSlice.reducer;