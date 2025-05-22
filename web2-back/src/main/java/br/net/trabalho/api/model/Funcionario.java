package br.net.trabalho.api.model;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("funcionario")
public class Funcionario extends Usuario {
    @Column(name="data_nascimento")
    private Date dataNascimento;

    public Funcionario() {
        super();
    }

    public Funcionario(String nome, String email, String senha, Date dataNascimento) {
        super(nome, email, senha, "funcionario");
        this.dataNascimento = dataNascimento;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
}
