import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViaCepResponse } from '../interfaces/viacepresponse';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private baseUrl = 'https://viacep.com.br/ws';

  http= inject( HttpClient);

  buscarEnderecoPorCep(cep: string): Observable<ViaCepResponse> {
    const url = `${this.baseUrl}/${cep}/json`;
    return this.http.get<ViaCepResponse>(url);
  }
}
