import { Component, ViewChild, ElementRef } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { ClienteService } from '../../../Cliente/services/cliente.service';
import { Usuario } from '../../../shared/model';


@Component({
  selector: 'app-relatorios-fieis',
  templateUrl: './relatorio-clientes-fieis.component.html'
})
export class RelatorioClientesFieisComponent {
  @ViewChild('content', { static: false }) el!: ElementRef;
  clientesFieis: Usuario[] = [];

  constructor(
    private readonly relatorioService: RelatorioService,
    private clienteService : ClienteService
    ) { }

    ngOnInit(): void {
      this.listarClientesFieis();
    }
  
    listarClientesFieis() {
      this.clienteService.listarClientesFieis().subscribe(
        clientes => {
          // Pega apenas os três primeiros clientes
          this.clientesFieis = clientes.slice(0, 3);
        },
        error => {
          console.error('Erro ao obter clientes fiéis', error);
        }
      );
      }

      gerarRelatorioClientesFieis() {
        const headers = ['Nome', 'Quantidade de Pedidos', 'Receita gerada'];
        const data: string [][] = this.clientesFieis.map(cliente => [
          cliente.nome!, cliente.quantidadePedidos!, cliente.valorReceita!, 
        ]);
        this.relatorioService.gerarPDF(headers, data)
      }
}
