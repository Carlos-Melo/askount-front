import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conta } from './conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  emitirEditar = new EventEmitter<number>();

  private readonly API = "https://askount.herokuapp.com/conta";

  constructor(private http: HttpClient) { }

  cadastrar(data: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${this.API}`, data);
  }

  listar(idUsuario: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.API}?idUsuario=${idUsuario}`);
  }

  editar(id: number, data: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<Conta> {
    return this.http.delete<Conta>(`${this.API}/${id}`);
  }

  getOne(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.API}/${id}`);
  }
}
