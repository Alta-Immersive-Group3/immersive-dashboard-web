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
  getUsers: (code?: string) =>
    instance({
      method: 'GET',
      url: `users`,
      headers: {
        Authorization: `Bearer ${code}`,
      },
    }),
};
