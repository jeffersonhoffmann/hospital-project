import { Component } from '@angular/core';

@Component({
  selector: 'app-aprovacao-orcamento',
  standalone: true,
  imports: [],
  templateUrl: './aprovacao-orcamento.component.html',
  styleUrl: './aprovacao-orcamento.component.css'
})
export class AprovacaoOrcamentoComponent {
  order = [
    {
      roupa: 'CAMISETA',
      prazo: '2',
      Quantidade: '05',
      valorUnitario: '5,00',
      total:'25,00',
    },
  ];

  rejeitar(){
  }

  aprovar(){
  }
}
