import { Injectable } from '@angular/core';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  BASE_URL = "http://localhost:8080";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  public gerarPDF(headers: string[], rows: string[][]) {
    const doc = new jspdf('l', 'pt', 'a4');
    autoTable(doc, {
      head: [headers],
      body: rows
    })

    doc.save('relatorio.pdf');
  }

  public getReceitasPorData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/receitaPorData`);
  }
}