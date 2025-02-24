import { TipoContato } from "./tipocontato";

export interface IContato {
  id: number;
  tipoContato: TipoContato;
  contato: string;
}
