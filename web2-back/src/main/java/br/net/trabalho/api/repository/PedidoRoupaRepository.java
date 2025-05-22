package br.net.trabalho.api.repository;

import br.net.trabalho.api.model.PedidoRoupa;
import br.net.trabalho.api.model.id.PedidoRoupaId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRoupaRepository extends JpaRepository<PedidoRoupa, PedidoRoupaId> {
}
