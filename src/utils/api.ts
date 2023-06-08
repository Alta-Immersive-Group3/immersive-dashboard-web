import axios from 'axios';
import { PostLogin } from './type';

const instance = axios.create({
  baseURL: `https://immersive-dashboard-api-7sngg27rcq-as.a.run.app/`,
});

export default {
  postLogin: (code?: PostLogin) =>
    instance({
      method: 'POST',
      url: `login`,
      data: code,
    }),
  getUserById: (token?: string, usid?: string) =>
    instance({
      method: 'GET',
      url: `users/${usid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
