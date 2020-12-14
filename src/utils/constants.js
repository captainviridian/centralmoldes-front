import storage from './storage';

const proxy = 'http://localhost:8080/';

function getHeaders() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const token = storage().getItem('token');
  if (token) headers.append('Authorization', `Token ${token}`);

  return headers;
}

export const postOptions = (body) => ({
  body: JSON.stringify(body),
  method: 'post',
  headers: getHeaders(),
});

export const getOptions = () => ({
  headers: getHeaders(),
});

export const API_URL = `${proxy}https://centralmoldes.herokuapp.com`;

export const MEDIA_URL = 'https://centralmoldes.herokuapp.com/media';
