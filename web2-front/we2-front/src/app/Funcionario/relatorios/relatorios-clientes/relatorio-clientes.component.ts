import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio.service';
import { Usuario } from '../../../shared/model';
import { ClienteService } from '../../../Cliente/services/cliente.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [],
  templateUrl: './relatorio-clientes.component.html'
})

export class RelatorioClientesComponent implements OnInit{
  @ViewChild('content', { static: false }) el!: ElementRef;
  clientes: Usuario[] = [];

  constructor(
    private readonly relatorioService: RelatorioService,
    private clienteService : ClienteService
    ) { }

  ngOnInit(): void {
    this.listarTodos();
  }


  listarTodos(): void {
    this.clienteService.listarTodos().subscribe({
      next: (data: Usuario[]) => {
        if (data == null) {
          this.clientes = [];
        } else {
          this.clientes = data;
          console.log(this.clientes);
        }
      }
    });
  }

  gerarRelatorioClientes(){
    const headers = ['nome', 'email', 'cpf', 'telefone', 'cep', 'rua', 'numero', 'estado', 'bairro', 'cidade'];
    const data = this.clientes.map(cliente => Object.values(cliente));
    this.relatorioService.gerarPDF(headers, data);
  }
}
