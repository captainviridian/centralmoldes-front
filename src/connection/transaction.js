import { API_URL, postOptions } from 'utils/constants';

export async function postPurchase(body) {
  try {
    const res = await fetch(`${API_URL}/transaction/`, postOptions(body));

    return res.status;
  } catch (e) {
    return null;
  }
}
