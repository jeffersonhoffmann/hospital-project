import { Routes } from '@angular/router';
import { LoginComponent } from './Geral/login/login.component';
import { AutocadastroComponent } from './Geral/autocadastro/autocadastro.component';
import { OrderOnlineComponent } from './Cliente/pedido/order-online/order-online.component';
import { ListagemPedidosComponent } from './Cliente/pedido/listagem-pedidos/listagem-pedidos.component';
import { AprovacaoOrcamentoComponent } from './Cliente/pedido/aprovacao-orcamento/aprovacao-orcamento.component';
import { PaginaInicialFuncionarioComponent } from './Funcionario/pedidos/pagina-inicial-funcionario/pagina-inicial-funcionario.component';
import { VisualizacaoDePedidosComponent } from './Funcionario/pedidos/visualizacao-de-pedidos/visualizacao-de-pedidos.component';
import { PagamentoPedidoComponent } from './Cliente/pedido/pagamento-pedido/pagamento-pedido.component';
import { RelatorioReceitasComponent } from './Funcionario/relatorios/relatorios-receitas/relatorio-receitas.component';
import { RelatorioClientesComponent } from './Funcionario/relatorios/relatorios-clientes/relatorio-clientes.component';
import { RelatorioClientesFieisComponent } from './Funcionario/relatorios/relatorios-clientes-fieis/relatorio-clientes-fieis.component';
import { ListarRoupasComponent } from './Funcionario/CrudRoupas/listar-roupas/listar-roupas.component';
import { EditarRoupaComponent } from './Funcionario/CrudRoupas/editar-roupa/editar-roupa.component';
import { InserirRoupaComponent } from './Funcionario/CrudRoupas/inserir-roupa/inserir-roupa.component';
import { ListarFuncionarioComponent } from './Funcionario/CrudFuncionarios/listar-funcionario/listar-funcionarios.component';
import { EditarFuncionarioComponent } from './Funcionario/CrudFuncionarios/editar-funcionario/editar-funcionario.component';
import { InserirFuncionarioComponent } from './Funcionario/CrudFuncionarios/inserir-funcionario/inserir-funcionario.component';
import { PaginaInicialClienteComponent } from './Cliente/pagina-inicial-cliente/pagina-inicial-cliente.component';
import { DashboardFuncionarioComponent } from './Funcionario/dashboard-funcionario/dashboard-funcionario.component';
import { DashboardClienteComponent } from './Cliente/dashboard-cliente/dashboard-cliente.component';
import { ConsultaPedidosComponent } from './Cliente/pedido/consulta-pedido/consulta-pedidos.component';

export const routes: Routes = [
  // Rota para a página de login
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'autocadastro', component: AutocadastroComponent, pathMatch: 'full' },

 // Rotas para funcionário
 {
  path: 'dashboard-funcionario',
  component: DashboardFuncionarioComponent,
  children: [
    { path: '', redirectTo: 'pagina-inicial-funcionario', pathMatch: 'full' },
    { path: 'pagina-inicial-funcionario', component: PaginaInicialFuncionarioComponent },
    { path: 'visualizacao-de-pedidos', component: VisualizacaoDePedidosComponent },
    { path: 'relatorio-receitas', component: RelatorioReceitasComponent },
    { path: 'relatorio-clientes', component: RelatorioClientesComponent },
    { path: 'relatorio-clientes-fieis', component: RelatorioClientesFieisComponent },
    { path: 'roupas', component: ListarRoupasComponent },
    { path: 'roupas/novo', component: InserirRoupaComponent },
    { path: 'roupas/editar/:id', component: EditarRoupaComponent },
    { path: 'funcionarios', component: ListarFuncionarioComponent },
    { path: 'funcionarios/novo', component: InserirFuncionarioComponent },
    { path: 'funcionarios/editar/:id', component: EditarFuncionarioComponent }
  ]
},

  // Rotas para o dashboard do cliente
  {
    path: 'dashboard-cliente',
    component: DashboardClienteComponent,
    children: [
      // Redirecionamento para a página inicial do cliente quando o dashboard é acessado
      { path: '', redirectTo: 'pagina-inicial-cliente', pathMatch: 'full' },
      // Páginas filhas do dashboard do cliente
      { path: 'pagina-inicial-cliente', component: PaginaInicialClienteComponent },
      { path: 'order-online', component: OrderOnlineComponent },
      { path: 'listagem-pedidos', component: ListagemPedidosComponent },
      { path: 'consulta-pedido', component: ConsultaPedidosComponent },
      { path: 'aprovacao-orcamento', component: AprovacaoOrcamentoComponent },
      { path: 'pagamento-pedido', component: PagamentoPedidoComponent }
    ]
  },

  // Redirecionamento para rotas não reconhecidas
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
