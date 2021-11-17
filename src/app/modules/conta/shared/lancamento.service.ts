import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lancamento } from './lancamento';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  emitirEditar = new EventEmitter<number>();

  private readonly API = "https://askount.herokuapp.com/lancamento";

  constructor(private http: HttpClient) { }

  cadastrar(data: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(`${this.API}`, data);
  }

  listar(idConta): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.API}?${idConta}`);
  }

  editar(id: number, data: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.API}/${id}`, data);
  }

  getOne(id: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.API}/${id}`);
  }
}
