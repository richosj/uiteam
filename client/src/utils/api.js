import config from '../config';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || '서버 오류가 발생했습니다.',
      response.status,
      data
    );
  }
  
  return data;
};

const getHeaders = () => {
  const token = localStorage.getItem(config.auth.tokenKey);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${config.api.baseURL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${config.api.baseURL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${config.api.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${config.api.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  upload: async (endpoint, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${config.api.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
    return handleResponse(response);
  },
};

export default api; 