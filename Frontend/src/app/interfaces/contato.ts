import { TipoContato } from "./tipo-contato";

export interface IContato {
    id: number;
    tipoContato: TipoContato;
    contato: string;
}
