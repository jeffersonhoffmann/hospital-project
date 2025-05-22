import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Funcionario } from '../../../shared/model';
import { FuncionarioService } from '../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './editar-funcionario.component.html',
})

export class EditarFuncionarioComponent implements OnInit{
  @ViewChild("formFuncionario") formFuncionario!: NgForm;
  funcionario: Funcionario = {
    dataNascimento: "",
    email: "",
    nome: "",
  };
  message!: string;
  
  constructor (
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
      this.funcionarioService.buscarPorId(id).subscribe(
        res=> { 
          if(res){
            const dataNascimento = res.dataNascimento!;
          this.funcionario = res;
            this.funcionario.dataNascimento = this.funcionarioService.formatarData(dataNascimento);
          }
          else 
            throw new Error ("Funcionário não encontrado: id = " + id);
        }
      )
  }

  atualizar(): void {
    if (this.formFuncionario.form.valid) {
      console.log(this.funcionario);
      this.funcionarioService.atualizar(this.funcionario).subscribe((funcionario) => {
        if (funcionario != null) {
          this.router.navigate( ["/dashboard-funcionario/funcionarios"] );
        } else {
          this.message = 'Erro ao atualizar funcionário';
        }
      });;
    }
  }
}