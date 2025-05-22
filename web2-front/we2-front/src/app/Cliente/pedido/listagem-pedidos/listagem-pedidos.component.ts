import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pedido, PedidoStatus,  } from '../../../shared/model';
import { PedidosService } from '../../../shared/services/pedidos/pedidos.service';
import { PedidoStatusService } from '../../../shared/services/pedidos/pedido-status.service';

@Component({
  selector: 'app-listagem-pedidos',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './listagem-pedidos.component.html',
  styleUrl: './listagem-pedidos.component.css'
})
export class ListagemPedidosComponent {
  pedidos!: Pedido[];
  status = PedidoStatus;
  filtroStatus!: PedidoStatus;
  statusRef! : PedidoStatus;

  constructor(
    private router: Router,
    private pedidosService: PedidosService,
    private pedidoStatusService: PedidoStatusService
  ){}

  ngOnInit(): void {
    this.pedidosService.listar().subscribe(pedidos => this.pedidos = pedidos)
  }

  aplicarFiltro(){
    this.pedidosService.listar(this.filtroStatus).subscribe(pedidos => this.pedidos = pedidos);
  }

  limparFiltro(){
    this.pedidosService.listar().subscribe(pedidos => this.pedidos = pedidos);
  }

  confirmarPagamento(id: string) {
    this.router.navigateByUrl(`/pagar-pedido/${id}`)
  }

  private atualizaTabela(id?: string){
    if (this.statusRef === PedidoStatus.EM_ABERTO){
      this.pedidos = this.pedidos.filter(pedido=> pedido.id !== id);
    }else{
      this.pedidosService.listar().subscribe(pedidos => this.pedidos = pedidos);
    }
    
  }

  remover(id: string): void{
    this.pedidosService.mudarStatus(id, PedidoStatus.CANCELADO)
    .subscribe(() => this.atualizaTabela(id));
  }

  getCorPedido(pedido: Pedido){
    return this.pedidoStatusService.getCssColor(pedido);
  }

}
