package br.net.trabalho.api.repository;

import br.net.trabalho.api.model.Roupa;
import org.springframework.data.jpa.repository.*;

public interface RoupaRepository extends JpaRepository<Roupa, Long> {
    public Roupa findByNome(String nome);
}
