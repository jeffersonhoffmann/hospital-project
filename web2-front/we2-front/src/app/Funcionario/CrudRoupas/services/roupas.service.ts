import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Inject,LOCALE_ID } from '@angular/core';

import { Roupas } from '../../../shared/model/roupas.model';


@Injectable({
  providedIn: 'root'
})
export class RoupasService {
  BASE_URL = "http://localhost:8080/roupas";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient, @Inject(LOCALE_ID)public locale: string
  ) {}


  listarRoupas(): Observable<Roupas[]> {
    return this.httpClient.get<Roupas[]>(this.BASE_URL, this.httpOptions);
  }



  inserirRoupa(roupa: Roupas): Observable<Roupas | null> {
    return this.httpClient.post<Roupas>(this.BASE_URL , roupa, this.httpOptions);
  }

  

  atualizarRoupa(roupa: Roupas): Observable<Roupas> {
    return this.httpClient.put<Roupas>(this.BASE_URL + '/' + roupa.id, roupa, this.httpOptions);
  }


  removerRoupa(id: number): Observable<Roupas>{
    return this.httpClient.delete<Roupas>(this.BASE_URL  + '/' + id, this.httpOptions);
  }

  
  buscarPorId(id: number): Observable<Roupas> {
    return this.httpClient.get<Roupas>(this.BASE_URL  + '/' + id, this.httpOptions);
  }
}
