const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
    timeout: 5000,
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
  },
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    errorColor: '#EF4444',
    warningColor: '#F59E0B',
    successColor: '#10B981',
  },
};

export default config; 