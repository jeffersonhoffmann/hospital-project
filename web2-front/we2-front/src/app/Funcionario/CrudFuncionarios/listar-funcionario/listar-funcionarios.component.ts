import { Component, OnInit } from '@angular/core';

import { FuncionarioService } from '../services/funcionario.service';
import { Funcionario } from '../../../shared/model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-funcionarios',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})

export class ListarFuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  constructor(
    private funcionarioService : FuncionarioService
  ){ }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    this.funcionarioService.listarTodos().subscribe({
      next: (data: Funcionario[]) => {
        if (data == null) {
          this.funcionarios = [];
        } else {
          this.funcionarios = data;
        }
      }
    });
  }


  remover($event: any, funcionario: Funcionario): void{
    $event.preventDefault();
    if(confirm(`Deseja realmente remover o funcionário ${funcionario.nome}?`)){
      this.funcionarioService.remover(funcionario.id!).subscribe({
        complete: () => { this.listarTodos(); }
        });
    }
  }

}
