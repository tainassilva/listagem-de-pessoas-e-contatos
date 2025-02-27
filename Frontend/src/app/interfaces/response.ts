import { IPessoa } from "./pessoa";

export interface IResponse {
    limit: number;
    pessoas: IPessoa[];
    skip: number;
    total: number;
}
