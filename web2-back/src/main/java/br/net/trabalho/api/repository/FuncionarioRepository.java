package br.net.trabalho.api.repository;

import br.net.trabalho.api.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    public Funcionario findByEmail(String email);

    @Query("from Funcionario where email = :email and senha = :senha")
    public Funcionario findByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);
}
