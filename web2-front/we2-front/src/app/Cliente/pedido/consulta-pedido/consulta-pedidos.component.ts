import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../shared/model';
import { PedidosService } from '../../../shared/services/pedidos/pedidos.service';
import { PedidoStatusService } from '../../../shared/services/pedidos/pedido-status.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-consulta-pedidos',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './consulta-pedidos.component.html',
  styleUrls: ['./consulta-pedidos.component.css'],
})
export class ConsultaPedidosComponent implements OnInit {
  busca: any;
  resultadoBusca: any = [];
  pedidos!: Pedido[]
  pedidosId: string[] = [];
  precoTotal!: number;

  constructor(private pedidosService: PedidosService, private pedidoStatusService: PedidoStatusService) {}

  ngOnInit(): void {
    this.pedidosService.listar().subscribe(pedidos =>this.pedidos = pedidos);
  }

  getColor(pedido: Pedido) {
    return this.pedidoStatusService.getCssColor(pedido);
  }


  pesquisa(busca: any): void{
    if(!busca.value) return;
    let p = this.pedidos.find(pedido => pedido.id.toString() === busca.value);
    if(p && !this.pedidosId.includes(p['id'])){
      this.resultadoBusca.push(p);
      this.pedidosId.push(p['id']);
    }
  }

  limparPesquisa(): void {
    this.precoTotal = 0;
    this.pedidosId = [];
    this.resultadoBusca = [];
  }
}