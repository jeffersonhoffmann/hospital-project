import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Usuario } from '../../shared/model';
import { Inject,LOCALE_ID } from '@angular/core';

const LS_CHAVE: string = "clientes"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientesFieis: Usuario[] = [];
  BASE_URL = "http://localhost:8080/clientes";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient, @Inject(LOCALE_ID)public locale: string
  ){}

  listarTodos(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.BASE_URL, this.httpOptions).pipe(
      map((clientes: Usuario[]) => {
        return clientes;
      })
    );
  }

  listarClientesFieis(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.BASE_URL + '/fiel', this.httpOptions).pipe(
      map((clientesData: any[]) => {
        this.clientesFieis = clientesData.map(cliente => ({
          nome: cliente[0],  // Índice 0 é o nome
          quantidadePedidos: cliente[1],  // Índice 1 é a quantidade de pedidos
          valorReceita: cliente[2],  // Índice 2 é o valor da receita
        }));
        return this.clientesFieis;
      })
    );
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.BASE_URL  + '/' + id, this.httpOptions);
  }

}