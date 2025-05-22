import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialFuncionarioComponent } from '../pedidos/pagina-inicial-funcionario/pagina-inicial-funcionario.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-funcionario',
  standalone: true,
  imports: [ CommonModule, PaginaInicialFuncionarioComponent, RouterModule],
  templateUrl: './dashboard-funcionario.component.html',
  styleUrl: './dashboard-funcionario.component.css'
})
export class DashboardFuncionarioComponent {

}
