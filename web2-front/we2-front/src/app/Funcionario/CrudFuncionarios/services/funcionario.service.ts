import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Inject,LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

import { Funcionario } from '../../../shared/model/funcionario.model';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  baseUrl = "http://localhost:8080/funcionarios";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, @Inject(LOCALE_ID)public locale: string) { }

  listarTodos(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl, this.httpOptions).pipe(
      map((funcionarios: Funcionario[]) => {
        return funcionarios.map(funcionario => {
          funcionario.dataNascimento = this.formatarDatalista(funcionario.dataNascimento!);
          return funcionario;
        });
      })
    );
  }

  inserir(funcionario: Funcionario): Observable<Funcionario | null> {
    return this.http.post<Funcionario>(this.baseUrl , funcionario, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.baseUrl  + '/' + id, this.httpOptions);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(this.baseUrl + '/' + funcionario.id, funcionario, this.httpOptions);
  }

  remover(id: number): Observable<Funcionario>{
    return this.http.delete<Funcionario>(this.baseUrl  + '/' + id, this.httpOptions);
  }

  formatarData(dataNascimento: string): string{
    dataNascimento = formatDate(dataNascimento, "yyyy-MM-dd",this.locale);
    return dataNascimento;
  }

  formatarDatalista(dataNascimento: string): string{
    dataNascimento = formatDate(dataNascimento, "dd/MM/yyyy",this.locale);
    return dataNascimento;
  }
}
