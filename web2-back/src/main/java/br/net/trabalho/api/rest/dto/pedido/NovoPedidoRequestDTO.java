package br.net.trabalho.api.rest.dto.pedido;

import java.time.LocalDateTime;
import java.util.List;

public class NovoPedidoRequestDTO {
    private Long clienteId;
    private List<RoupasNovoPedidoDTO> roupas;
   

    public Long getClienteId() {
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }

    public List<RoupasNovoPedidoDTO> getRoupas() {
        return roupas;
    }

    public void setRoupas(List<RoupasNovoPedidoDTO> roupas) {
        this.roupas = roupas;
    }
}
