import React, { createContext, useState, useContext, ReactNode } from 'react';
import { fetchCep } from '../services/cepService';
import { CepResponse } from '../types/cepType';

interface CepContextData {
  cep: string;
  setCep: (value: string) => void;
  resultado: CepResponse | null;
  consultarCep: () => Promise<void>;
  historico: CepResponse[];
}

interface CepProviderProps {
  children: ReactNode;
}

export const CepContext = createContext<CepContextData>({} as CepContextData);

export function CepProvider({ children }: CepProviderProps) {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState<CepResponse | null>(null);
  const [historico, setHistorico] = useState<CepResponse[]>([]);

  const consultarCep = async () => {
    if (!cep) return;

    try {
      const dados = await fetchCep(cep);

      setResultado(dados);

      // Se não tiver "erro: true" → adiciona ao histórico
      if (!dados.erro) {
        setHistorico((prev) => [...prev, dados]);
      }
    } catch (error) {
      console.log('Erro ao consultar o CEP:', error);
    }
  };

  return (
    <CepContext.Provider
      value={{
        cep,
        setCep,
        resultado,
        consultarCep,
        historico,
      }}
    >
      {children}
    </CepContext.Provider>
  );
}
