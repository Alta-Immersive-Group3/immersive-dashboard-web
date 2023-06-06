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
  getUsers: (code?: string) =>
    instance({
      method: 'GET',
      url: `users`,
      headers: {
        Authorization: `Bearer ${code}`,
      },
    }),
};
