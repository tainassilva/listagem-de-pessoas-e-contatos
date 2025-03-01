import { IContato } from "./contato";
import { Estados } from "./estados";
export interface IPessoa {
  id?: number;
  nome: string;
  endereco: string;
  numeroCasa: string;
  cep: string;
  cidade: string;
  uf: Estados;
  contatos: IContato[];
}

