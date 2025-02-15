export const API_CONFIG = {
  BASE_URL: 'https://backend-4ktnwhrvz-souhirbejis-projects.vercel.app',
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
    },
    MESSAGES: {
      BASE: '/messages',
      BY_ID: (id) => `/messages/${id}`,
      REPLY: (id) => `/messages/${id}/reply`
    },
    VIEWS: {
      COUNT: '/views/count',
      INCREMENT: '/views/increment'
    }
  }
};
