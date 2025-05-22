package br.net.trabalho.api.repository;

import br.net.trabalho.api.model.Cliente;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    public Cliente findByEmail(String email);

    @Query("from Cliente where email = :email and senha = :senha")
    public Cliente findByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);


    @Query("SELECT u.nome, COUNT(p) AS quantidade, SUM(p.precoTotal) AS receita " +
           "FROM Cliente u " +
           "JOIN u.pedidos p " +
           "WHERE u.perfil = :perfil " +
           "GROUP BY u.nome " +
           "ORDER BY quantidade DESC")
    List<Object[]> countAndSumByPerfil(@Param("perfil") String perfil);
}

