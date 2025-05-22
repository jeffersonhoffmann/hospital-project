import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pedido, PedidoStatus } from '../../model';
import { Perfil } from '../../model';
import { LoginService } from '../../../Geral/auth/services/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface NovoPedido{
  roupas: {id: number; quantidade: number;}[];
}

interface Orcamento{
  id: number; prazo: Date; precoTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  BASE_URL = "http://localhost:8080/pedidos";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  public inserir(pedido: NovoPedido): Observable<Orcamento>{
    const usuarioLogado = this.loginService.usuarioLogado;
    return this.httpClient.post<Orcamento>(this.BASE_URL, {...pedido, clienteId: usuarioLogado.id}, this.httpOptions)
  }


  public buscarPorId(id: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(this.BASE_URL+'/'+id);
  }

  public atualizar(pedido: Pedido): void {
    
  }

  public remover(id: string): void {
    
  }

  public mudarStatus(id: string, status: PedidoStatus): Observable<void> {
    return this.httpClient.patch<void>(this.BASE_URL+'/'+id+'/status', { status });
  }

  public pagamento(id: number, metodo: string) {
    return this.httpClient.post<void>(this.BASE_URL+'/'+id+'/pagamento', { metodo });
  }

  public listar(status?: PedidoStatus): Observable<Pedido[]>  {
    const usuarioLogado = this.loginService.usuarioLogado;

    if (usuarioLogado.perfil === Perfil.CLIENTE) {
      if (status) {
        return this.httpClient.get<Pedido[]>(this.BASE_URL, {
          ...this.httpOptions, 
          params: {
            cliente: String(usuarioLogado.id),
            status: String(status)
          }
        });
      }
      return this.httpClient.get<Pedido[]>(this.BASE_URL, {
        ...this.httpOptions, 
        params: {
          cliente: String(usuarioLogado.id)
        }
      });
    } else {
      if (status) {
        return this.httpClient.get<Pedido[]>(this.BASE_URL, {
          ...this.httpOptions, 
          params: {
            status: String(status)
          }
        });
      }
      return this.httpClient.get<Pedido[]>(this.BASE_URL, {
        ...this.httpOptions,
      });
    }
  }
  
}
