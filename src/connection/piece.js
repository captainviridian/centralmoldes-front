import { API_URL } from 'utils/constants';

export async function getPieces() {
  return (await (await fetch(`${API_URL}/peca/listar`)).json()).resultados;
}

export async function getPiece(id) {
  return (await (await fetch(`${API_URL}/peca/info?id=${id}`)).json()).peca[0];
}
