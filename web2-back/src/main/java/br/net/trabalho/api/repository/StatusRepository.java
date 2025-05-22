package br.net.trabalho.api.repository;

import br.net.trabalho.api.model.Status;
import br.net.trabalho.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
    public Status findByNome(String nome);
}
