package br.net.trabalho.api.repository;


import br.net.trabalho.api.model.Pedido;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;


import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    public List<Pedido> findByClienteIdOrderByDataPedidoDesc(Long clienteId);
    public List<Pedido> findByClienteIdAndStatusIdOrderByDataPedidoDesc(Long clienteId, Long statusId);
    //metodos perfil funcionário
    public List<Pedido> findByStatusIdOrderByDataPedidoAsc(Long statusId);

    @Query("SELECT p.data, SUM(p.valor) as receita FROM Pagamento p GROUP BY p.data")
    List<Object[]> calcularReceitaPorData();

}
