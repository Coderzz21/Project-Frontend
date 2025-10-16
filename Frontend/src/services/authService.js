import api from '../utils/api';

const extractErrorMessage = (error) => {
  const res = error?.response?.data;
  if (!res) return error.message || 'Unknown error';

  // If express-validator errors array
  if (Array.isArray(res.errors) && res.errors.length) {
    return res.errors.map(e => e.msg).join('; ');
  }

  // If message field provided
  if (res.message) return res.message;

  return JSON.stringify(res);
};

export const register = async (userData) => {
  try {
    const res = await api.post('/auth/register', userData);
    return {
      user: res.data.user,
      token: res.data.token,
    };
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const login = async (credentials) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return {
      user: res.data.user,
      token: res.data.token,
    };
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};

export const loadUser = async () => {
  try {
    const res = await api.get('/auth/profile');
    return res.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
