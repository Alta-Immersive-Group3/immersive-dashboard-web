import axios from 'axios';
import { PostLogin, putUser } from './type';

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
  putUserById: (token?: string, usid?: string, data?: putUser) =>
    instance({
      method: 'PUT',
      url: `users/${usid}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUserAll: (token?: string) =>
    instance({
      method: 'GET',
      url: `users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
