import { createSlice } from '@reduxjs/toolkit';
import { fetchSkills, createSkill, updateSkill, deleteSkill } from './SkillThunk';

const initialState = {
  skills: [],
  loading: false,
  error: null,
};

const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex(skill => skill._id === action.payload._id);
        if (index !== -1) {
          state.skills[index] = action.payload;
        }
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(skill => skill._id !== action.payload);
      });
  },
});

export const { clearError } = skillSlice.actions;
export default skillSlice.reducer;
export { fetchSkills, createSkill, updateSkill, deleteSkill };