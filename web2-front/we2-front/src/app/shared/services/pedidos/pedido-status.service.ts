import { Injectable } from "@angular/core";
import { Pedido, PedidoStatus } from "../../model";

@Injectable({
  providedIn: 'root'
})
export class PedidoStatusService {
  public getCssColor(pedido: Pedido) {
    switch (pedido.status) {
      case PedidoStatus.EM_ABERTO:
        return {
          color: '#D6B85A'
        }
      case PedidoStatus.AGUARDANDO_PAGAMENTO:
        return {
          color: 'blue'
        }
      case PedidoStatus.PAGO:
        return {
          color: 'orange'
        }
      case PedidoStatus.FINALIZADO:
        return {
          color: 'green'
        }
      case PedidoStatus.REJEITADO:
        return {
          color: 'red'
        }
      case PedidoStatus.CANCELADO:
          return {
            color: 'red'
          }
      default:
        return;
    }
  }
}