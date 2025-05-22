import { Injectable } from '@angular/core';
import { Login, Usuario } from '../../shared';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LS_CHAVE: string = "usuarioLogado"; 

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  BASE_URL = "http://localhost:8080/cadastro";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  cadastro(usuario: Usuario): Observable<Usuario | null> {
    return this.httpClient.post<Usuario>(this.BASE_URL, usuario, this.httpOptions);
  }
}