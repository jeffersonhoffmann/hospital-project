import { Component, OnInit } from '@angular/core';

import { RoupasService } from '../services/roupas.service';
import { Roupas } from '../../../shared/model/roupas.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-roupas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './listar-roupas.component.html',
  styleUrls: ['./listar-roupas.component.css']
})
export class ListarRoupasComponent implements OnInit {
  roupas: Roupas[] = [];
  constructor(private roupasService: RoupasService){}

  ngOnInit(): void{
    this.listarRoupas();
  }

  listarRoupas(): void{
    this.roupasService.listarRoupas().subscribe({
      next: (data: Roupas[]) => {
        if (data == null) {
          this.roupas = [];
        } else {
          this.roupas = data;
        }
      }
    });
  }

  remover($event: any, roupa: Roupas): void{
    $event.preventDefault();
    if(confirm(`Deseja excluir a peça de roupa ${roupa.nome}?`)){
        this.roupasService.removerRoupa(roupa.id!).subscribe({
        complete: () => { this.listarRoupas(); }
        });
    }
  }

}
