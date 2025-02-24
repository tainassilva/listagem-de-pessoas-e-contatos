import { Estados } from "./estados";
import { IContato } from "./contato";

export interface IPessoa {
  id: number;
  nome: string;
  cep: string;
  endereco: string;
  cidade: string;
  uf: Estados;
  contatos: IContato[];
}
