import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lancamento } from './lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  private readonly API = "https://askount.herokuapp.com/lancamento";

  constructor(private http: HttpClient) { }

  listar(idConta): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.API}?${idConta}`);
  }
}
