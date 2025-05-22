import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido, PedidoStatus } from '../../shared/model';
import { PedidosService } from '../../shared/services/pedidos/pedidos.service';
import { PedidoStatusService } from '../../shared/services/pedidos/pedido-status.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pagina-inicial-cliente',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pagina-inicial-cliente.component.html',
  styleUrl: './pagina-inicial-cliente.component.css'
})
export class PaginaInicialClienteComponent implements OnInit {
  pedidosEmAberto: Pedido[] = [];
  status = PedidoStatus;
  pedidos: Pedido[] = [];

  constructor(
    private pedidosService: PedidosService,
    private pedidoStatusService: PedidoStatusService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.pedidosService.listar(this.status.EM_ABERTO).subscribe(pedidos => this.pedidosEmAberto = pedidos);
  }

  getCorPedido(pedido: Pedido) {
    return this.pedidoStatusService.getCssColor(pedido);
  }

  cancelar(id: string): void {
    this.pedidosService.mudarStatus(id, PedidoStatus.CANCELADO).subscribe(() => this.atualizaTabela(id));
  }

  confirmarPagamento(id: string) {
    this.router.navigateByUrl(`/pagar-pedido/${id}`);
  }

  private atualizaTabela(id?: string) {
    if (id) {
      this.pedidosEmAberto = this.pedidosEmAberto.filter(pedido => pedido.id !== id);
    } else {
      this.pedidosService.listar(this.status.EM_ABERTO).subscribe(pedidos => this.pedidosEmAberto = pedidos);
    }
  }
  
}
