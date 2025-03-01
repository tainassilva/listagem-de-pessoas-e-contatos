import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPessoa } from '../interfaces/pessoa';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  url = environment.url;

  http = inject(HttpClient)

  buscarTodasAsPessoas() {
    return this.http.get<IPessoa[]>(`${this.url}/pessoas`);
  }


  buscarPessoaPorId(id: number): Observable<IPessoa> {
    return this.http.get<IPessoa>(`${this.url}/pessoas/${id}`);
  }

  cadastrarPessoa(pessoa: IPessoa){
    return this.http.post<IPessoa>(`${this.url}/pessoas`, pessoa);
  }

  deletarPessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/pessoas/${id}`);
  }

  atualizarPessoa(id: number, pessoa: IPessoa): Observable<IPessoa> {
    return this.http.put<IPessoa>(`${this.url}/pessoas/${id}`, pessoa);
  }
}
