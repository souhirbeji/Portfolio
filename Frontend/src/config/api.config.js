export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      CHECK: '/auth/check' // Nouvel endpoint
    },
    SKILLS: {
      BASE: '/skills',
      BY_ID: (id) => `/skills/${id}`
    },
    PROJECTS: {
      BASE: '/projects',
      BY_ID: (id) => `/projects/${id}`
    },
    EXPERIENCES: {
      BASE: '/experiences',
      BY_ID: (id) => `/experiences/${id}`
    }
  }
};
