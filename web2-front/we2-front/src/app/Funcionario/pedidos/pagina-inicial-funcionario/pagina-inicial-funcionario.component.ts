import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Pedido, PedidoStatus } from '../../../shared/model';
import { PedidosService } from '../../../shared/services/pedidos/pedidos.service';
import { PedidoStatusService } from '../../../shared/services/pedidos/pedido-status.service';

@Component({
  selector: 'app-pagina-inicial-funcionario',
  templateUrl: './pagina-inicial-funcionario.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  styleUrls: ['./pagina-inicial-funcionario.component.css'],
  providers: [DatePipe]
})
export class PaginaInicialFuncionarioComponent implements OnInit {
  @Input() pedidos!: Pedido[];
  status = PedidoStatus;

  constructor(private pedidosService: PedidosService, 
              private pedidoStatusService: PedidoStatusService) {}

  ngOnInit(): void {
    this.pedidosService
      .listar(PedidoStatus.EM_ABERTO)
      .subscribe((pedidos) => (this.pedidos = pedidos));
  }

  getColor(pedido: Pedido) {
    return this.pedidoStatusService.getCssColor(pedido);
  }

  confirmarRecolhimento(id: string) {
    this.pedidosService
      .mudarStatus(id, PedidoStatus.RECOLHIDO)
      .subscribe(() => this.atualizaTabela(id));
  }

  private atualizaTabela(id?: string) {
    if (this.pedidos.some(pedido => pedido.id === id && pedido.status === PedidoStatus.EM_ABERTO)) {
      this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
    } else {
      this.pedidosService.listar().subscribe(pedidos => this.pedidos = pedidos);
    }
  }
}
