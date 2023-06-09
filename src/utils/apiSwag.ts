import axios from 'axios';
import { PostLogin, putUser } from './type';

const instance = axios.create({
  baseURL: `https://virtserver.swaggerhub.com/iffakhry/alta-dashboard/1.0.0/`,
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
  postAddUser: (token?: string, data?: any) =>
    instance({
      method: 'POST',
      url: `users`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delUserById: (token?: string, usid?: any) =>
    instance({
      method: 'DELETE',
      url: `users/${usid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  editUsersById: (token?: string, usid?: string, data?: putUser) =>
    instance({
      method: 'PUT',
      url: `users/${usid}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // classs

  getClassAll: (token?: string) =>
    instance({
      method: 'GET',
      url: `classes`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  postAddClass: (token?: string, data?: any) =>
    instance({
      method: 'POST',
      url: `classes`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getClassById: (token?: string, cid?: string) =>
    instance({
      method: 'GET',
      url: `classes/${cid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  editClassById: (token?: string, usid?: string, data?: putUser) =>
    instance({
      method: 'PUT',
      url: `classes/${usid}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delClassesById: (token?: string, usid?: any) =>
    instance({
      method: 'DELETE',
      url: `classes/${usid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
