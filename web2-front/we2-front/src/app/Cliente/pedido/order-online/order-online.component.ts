import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-online',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
  ],
  templateUrl: './order-online.component.html',
  styleUrls: ['./order-online.component.css']
})

export class OrderOnlineComponent {// não mudar os valore, senão dá pau

  constructor(private router: Router) { }
  showEstimate: boolean = false;
  estimateValue: number = 0;
  estimateTime: number  = 0;
  showOrderDetails: boolean = false;
  orderNumber: number = 0;
  orderStatus: string = '';

  calculateEstimate() {
    this.estimateValue = 10.00; // valor simulado, alterar conforme a situação
    this.estimateTime = 3; // ajustar de acordo com a situação
    this.showEstimate = true;
  }

  approveEstimate() {
    // Lógica para aprovar o orçamento
    this.orderNumber = this.generateOrderNumber();
    this.showOrderDetails = true;
    alert('Orçamento aprovado! Número do Pedido: ' + this.orderNumber);
  }

  rejectEstimate() {
    // Lógica para rejeitar o orçamento
    this.orderStatus = 'REJEITADO';
    alert('Orçamento rejeitado.');
  }

  submitOrder() {
    // Lógica de envio do pedido
    this.orderStatus = 'EM ABERTO';
    alert('Pedido enviado com sucesso! Número do Pedido: ' + this.orderNumber);
  }

  generateOrderNumber(): number {
    // Função para gerar um número de pedido simulado
    return Math.floor(Math.random() * 1000) + 1;
  }

  redirectToPage() {
    this.router.navigate(['/aprovacao-orcamento']);
  }
}
