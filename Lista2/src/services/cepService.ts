import axios from 'axios';
import { CepResponse } from '../types/cepType';

export async function fetchCep(cep: string): Promise<CepResponse> {
  const response = await axios.get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
}
