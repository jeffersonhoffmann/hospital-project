import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { format } from 'date-fns';

interface IReceita {
  data: string;
  valorRecebido: string;
}

@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html'
})
export class RelatorioReceitasComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;
  receitas: IReceita[] = [];

  constructor(
    private readonly relatorioService: RelatorioService,
  ) {}

  ngOnInit(): void {
    this.carregarReceitasPorData();
  }

  carregarReceitasPorData(): void {
    this.relatorioService.getReceitasPorData().subscribe({
      next: (data: any[]) => {
        this.receitas = data.map(item => ({
          data: this.formatarData(item[0]),
          valorRecebido: item[1]
        }));
      },
      error: (error) => {
        console.error('Erro ao obter receitas por data', error);
      }
    });
  }

  gerarRelatorioReceitas() {
    const headers = ['Data', 'Valor Recebido'];
    const data: string[][] = this.receitas.map(receita => [
      receita.data, receita.valorRecebido
    ]);
    this.relatorioService.gerarPDF(headers, data);
  }

  private formatarData(data: string): string {
    const dataFormatada = format(new Date(data), 'dd/MM/yyyy');
    return dataFormatada;
  }
}