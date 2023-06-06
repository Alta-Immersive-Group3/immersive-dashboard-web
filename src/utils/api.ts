import axios from 'axios';

const instance = axios.create({
  baseURL: `https://virtserver.swaggerhub.com/iffakhry/alta-dashboard/1.0.0/`,
});

export default {
  postLogin: (code?: object) =>
    instance({
      method: 'POST',
      url: `login`,
      data: { code },
    }),
  getTaskIdx: (code?: string) =>
    instance({
      method: 'GET',
      url: `tasks/${code}`,
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_TODO_API
            ? import.meta.env.VITE_TODO_API
            : process.env.VITE_TODO_API
        }`,
      },
    }),
};
