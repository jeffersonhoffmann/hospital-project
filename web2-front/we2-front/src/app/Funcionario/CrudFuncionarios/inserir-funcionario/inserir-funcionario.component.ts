import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Funcionario } from '../../../shared/model';
import { FuncionarioService } from '../services/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inserir-funcionario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './inserir-funcionario.component.html',
  styleUrls: ['./inserir-funcionario.component.css']
})

export class InserirFuncionarioComponent implements OnInit {
  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  funcionario!: Funcionario;
  message!: string;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.funcionario = new Funcionario();
  }

  inserir(): void {
    if (this.formFuncionario.form.valid) {
      const dataNascimento = new Date(this.formFuncionario.value['dataNascimento']+'T03:00').toISOString()
      this.funcionario.dataNascimento = dataNascimento
      this.funcionarioService.inserir(this.funcionario)
        .subscribe((funcionario) => {
          if (funcionario != null) {
            this.router.navigate( ["/dashboard-funcionario/funcionarios"] );
          } else {
            this.message = 'Erro ao cadastrar funcionário';
          }
        });
    }
  }
}
