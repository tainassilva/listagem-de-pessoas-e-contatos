import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPessoa } from '../interfaces/pessoa';  // Importar a interface
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  buscarTodasAsPessoas(): Observable<IPessoa[]> {
    return this.http.get<IPessoa[]>(`${this.url}`);
  }


  buscarPessoaPorId(id: number): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.url}/${id}`);
  }

  cadastrarPessoa(pessoa: IPessoa): Observable<IPessoa> {
    return this.http.post<IPessoa>(`${this.url}`, pessoa);
  }

  deletarPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  atualizarPessoa(id: number, pessoa: IPessoa): Observable<IPessoa> {
    return this.http.put<IPessoa>(`${this.url}/${id}`, pessoa);
  }
}
