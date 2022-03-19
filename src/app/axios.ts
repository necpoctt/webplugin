import axios from 'axios';

const baseAPI = axios.create({
  baseURL: 'https://super8-chat-plugin-poc.herokuapp.com',
  timeout: 10000,
});

baseAPI.interceptors.request.use(
  request => {
    const currentUser: any = JSON.parse(localStorage.getItem('super8') || '{}');
    if (currentUser.uid) {
      request.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }

    return request;
  },
  error => Promise.reject(error),
);

baseAPI.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) return error.response.data;
    return error;
  },
);

export default baseAPI;
