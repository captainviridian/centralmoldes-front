const proxy = 'http://localhost:8080/';

const postHeaders = new Headers();
postHeaders.append('Content-Type', 'application/json');

export const postOptions = (body) => ({
  body: JSON.stringify(body),
  method: 'post',
  headers: postHeaders,
});

export const API_URL = `${proxy}https://centralmoldes.herokuapp.com`;
