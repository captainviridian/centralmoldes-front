import { API_URL, getOptions, postOptions } from 'utils/constants';

export async function postUser(body) {
  try {
    const res = await fetch(`${API_URL}/usuario/register`, postOptions(body));

    return res.status;
  } catch (e) {
    return null;
  }
}

export async function postLogin(body) {
  try {
    const res = await fetch(`${API_URL}/usuario/login`, postOptions(body));

    if (res.status === 200) return res.json();
    return null;
  } catch (e) {
    return null;
  }
}

export async function getInfo(email) {
  try {
    const res = await fetch(`${API_URL}/usuario/info?username=${email}`, getOptions());

    return (await res.json()).user[0];
  } catch (e) {
    return null;
  }
}
