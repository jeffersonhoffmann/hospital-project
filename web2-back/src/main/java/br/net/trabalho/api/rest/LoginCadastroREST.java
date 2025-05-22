package br.net.trabalho.api.rest;

import br.net.trabalho.api.model.Cliente;
import br.net.trabalho.api.model.Funcionario;
import br.net.trabalho.api.model.Login;
import br.net.trabalho.api.model.Usuario;
import br.net.trabalho.api.repository.ClienteRepository;
import br.net.trabalho.api.repository.UsuarioRepository;
import br.net.trabalho.api.rest.dto.ClienteDTO;
import br.net.trabalho.api.rest.dto.UsuarioDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginCadastroREST {
    public static List<Funcionario> listaCli = new ArrayList<>();

    @Autowired
    private UsuarioRepository loginRepo;

    @Autowired
    private ClienteRepository cadastroRepo;

    @Autowired
    private ModelMapper mapper;

    @PostMapping("/login")
    UsuarioDTO login(@RequestBody Login login) {
        Usuario usuario = loginRepo.findByEmailAndSenha(login.getEmail(), login.getSenha());
        return mapper.map(usuario, UsuarioDTO.class);
    }

    @PostMapping("/cadastro")
    UsuarioDTO cadastro(@RequestBody ClienteDTO clienteDTO) {
        clienteDTO.setSenha("abc123");
        cadastroRepo.save(mapper.map(clienteDTO, Cliente.class));

        Usuario usuario = cadastroRepo.findByEmail(clienteDTO.getEmail());

        return mapper.map(usuario, UsuarioDTO.class);
    }

    @GetMapping("/clientes")
	List<ClienteDTO> listarTodos() {
		List<Cliente> listaCli = cadastroRepo.findAll();
		return listaCli.stream().map(e -> mapper.map(e, ClienteDTO.class))
							  .collect(Collectors.toList());
	}


    @GetMapping(path = {"/clientes/{id}"})

	public ResponseEntity findById(@PathVariable long id) {
		return cadastroRepo.findById(id).map(record -> ResponseEntity.ok().body(record)).orElse(ResponseEntity.notFound().build());
	}

    @GetMapping("/clientes/fiel")
    public List<Object[]> countAndSumByPerfil(@PathVariable(required = false) String perfil) {
        String perfilFixo = "cliente";
        if (perfil != null && !perfil.isEmpty()) {
            perfilFixo = perfil;
        }
    return cadastroRepo.countAndSumByPerfil(perfilFixo);
    }


}
