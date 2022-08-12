import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://por-quanto-eu-vou.herokuapp.com',
});
