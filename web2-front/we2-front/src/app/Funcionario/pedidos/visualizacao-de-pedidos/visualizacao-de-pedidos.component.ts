import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido, PedidoStatus } from '../../../shared/model';
import { PedidosService } from '../../../shared/services/pedidos/pedidos.service';
import { PedidoStatusService } from '../../../shared/services/pedidos/pedido-status.service';


@Component({
  selector: 'app-visualizacao-de-pedidos',
  templateUrl: './visualizacao-de-pedidos.component.html',
  styleUrls: ['./visualizacao-de-pedidos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VisualizacaoDePedidosComponent implements OnInit {
  @Input() pedidosTodos!: Pedido[];
  status = PedidoStatus;

  constructor(private pedidosService: PedidosService, 
              private pedidoStatusService: PedidoStatusService) {}

  ngOnInit(): void {
    this.pedidosService.listar().subscribe((pedidos) => (this.pedidosTodos = pedidos));
  }

  getColor(pedido: Pedido) {
    return this.pedidoStatusService.getCssColor(pedido);
  }

  confirmarRecolhimento(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.RECOLHIDO)
      .subscribe(() => this.atualizaTabela(id));
  }

  confirmarLavagem(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.AGUARDANDO_PAGAMENTO)
      .subscribe(() => this.atualizaTabela(id));
  }

  confirmarPagamento(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.PAGO)
      .subscribe(() => this.atualizaTabela());
  }

  finalizarPedido(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.FINALIZADO)
      .subscribe(() => this.atualizaTabela());
  }

  private atualizaTabela(id?: string) {
    this.pedidosService.listar().subscribe(pedidos => this.pedidosTodos = pedidos);
  }
}
