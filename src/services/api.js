import axios from 'axios';

const token = localStorage.getItem("paisestoken");


export const APIHeaders = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  Authorization: `Bearer ${token}`
};

export const API = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: APIHeaders,
});
