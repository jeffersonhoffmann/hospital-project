import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Roupas } from '../../../shared/model/roupas.model';
import { RoupasService } from '../services/roupas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-editar-roupa',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './editar-roupa.component.html',
  styleUrls: ['./editar-roupa.component.css']
})

export class EditarRoupaComponent implements OnInit {
  @ViewChild("formRoupa") formRoupa!:NgForm;
  roupa: Roupas = {};
  message!: string;

  constructor(
    private roupasService: RoupasService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
      this.roupasService.buscarPorId(id).subscribe(
        res=> { 
          if(res !== undefined){
          this.roupa = res;
          }
          else 
            throw new Error ("Roupa não encontrado: id = " + id);
        }
      )
  }

  atualizar(): void{
    if(this.formRoupa.form.valid){
      this.roupasService.atualizarRoupa(this.roupa).subscribe((roupa) => {
        if (roupa != null) {
          this.router.navigate( ["/dashboard-funcionario/roupas"] );
        } else {
          this.message = 'Erro ao atualizar roupa';
        }
      });;
    }
  }

}
