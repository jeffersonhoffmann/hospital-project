package br.net.trabalho.api.rest.dto.pedido;

import java.util.List;

public class RoupasNovoPedidoDTO {
    private Long id;
    private int quantidade;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
