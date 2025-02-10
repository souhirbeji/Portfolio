import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import skillReducer from './Slices/SkillSlice';
import projectReducer from './Slices/ProjectSlice';
import experienceReducer from './Slices/ExperienceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillReducer,
    projects: projectReducer,
    experiences: experienceReducer,
  },
});
// le store populates les fonctions dans tt l'app