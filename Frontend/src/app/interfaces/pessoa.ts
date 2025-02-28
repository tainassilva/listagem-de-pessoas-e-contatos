import { Estados } from "./estados";

export interface IPessoa {
  id: number; // Opcional para novos cadastros
  nome: string;
  endereco: string;
  numeroCasa: string;
  cep: string;
  cidade: string;
  uf: Estados;
  contatos: string[];
}

