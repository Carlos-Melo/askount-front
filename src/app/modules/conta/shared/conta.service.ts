import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conta } from './conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private readonly API = "https://askount.herokuapp.com/conta";

  constructor(private http: HttpClient) { }

  cadastrar(data: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${this.API}`, data);
  }

  listar(idUsuario: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.API}?idUsuario=${idUsuario}`);
  }

  getOne(id): Observable<Conta> {
    return this.http.get<Conta>(`${this.API}/${id}`);
  }
}
