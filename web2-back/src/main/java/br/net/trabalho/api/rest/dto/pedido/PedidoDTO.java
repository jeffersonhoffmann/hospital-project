package br.net.trabalho.api.rest.dto.pedido;

import br.net.trabalho.api.model.Roupa;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class PedidoDTO {
    private Long id;
    private LocalDateTime dataPedido;
    private List<PedidoRoupaDTO> roupas;
    private Date prazo;
    private String status;
    private double precoTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<PedidoRoupaDTO> getRoupas() {
        return roupas;
    }

    public void setRoupas(List<PedidoRoupaDTO> roupas) {
        this.roupas = roupas;
    }

    public Date getPrazo() {
        return prazo;
    }

    public void setPrazo(Date prazo) {
        this.prazo = prazo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getPrecoTotal() {
        return precoTotal;
    }

    public void setPrecoTotal(double precoTotal) {
        this.precoTotal = precoTotal;
    }

    public void setDataPedido(LocalDateTime dataPedido){
        this.dataPedido = dataPedido;
    }

    public LocalDateTime getDataPedido(){
        return dataPedido;
    }
}
