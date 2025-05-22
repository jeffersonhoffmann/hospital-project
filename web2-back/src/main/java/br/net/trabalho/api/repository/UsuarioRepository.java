package br.net.trabalho.api.repository;

import br.net.trabalho.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);

    @Query("from Usuario where email = :email and senha = :senha")
    Usuario findByEmailAndSenha(@Param("email") String email, @Param("senha") String senha);
}
