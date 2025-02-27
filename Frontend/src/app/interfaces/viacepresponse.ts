export interface ViaCepResponse {
  logradouro: string;
  localidade: string;
  uf: string;
  erro?: boolean; // Adicionado para tratar erros da API
}
