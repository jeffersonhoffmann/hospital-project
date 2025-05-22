# web2-back


## Creating database lol_lavanderia;

```sql
CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    descricao VARCHAR(255)
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    perfil VARCHAR(255),
    cpf VARCHAR(255),
    telefone VARCHAR(255),
    endereco VARCHAR(255),
    data_nascimento DATE
);

CREATE TABLE roupas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    preco NUMERIC(7,2),
    prazo INT
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    prazo DATE,
    preco_total NUMERIC(7,2),
    id_status SERIAL,
    id_cliente SERIAL,
    data_pedido TIMESTAMP,
    FOREIGN KEY (id_status) REFERENCES STATUS (id),
    FOREIGN KEY (id_cliente) REFERENCES USUARIOS (id)
);

CREATE TABLE pedidos_roupas(
    id_pedido SERIAL,
    id_roupa SERIAL,
    quantidade INT,
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id),
    FOREIGN KEY (id_roupa) REFERENCES roupas (id)
);

CREATE TABLE pagamentos(
    id SERIAL PRIMARY KEY,
    metodo VARCHAR(255),
    valor NUMERIC(7,2),
    data DATE,
    id_pedido SERIAL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id)
);
```


## Script to create status
```sql
INSERT INTO public.status (id, nome, descricao)
VALUES (1, 'em aberto', 'Estado inicial do pedido');  
INSERT INTO public.status (id, nome, descricao)
VALUES (2, 'rejeitado', 'Orcamento rejeitado');  
INSERT INTO public.status (id, nome, descricao)
VALUES (3, 'cancelado', 'Pedido cancelado');  
INSERT INTO public.status (id, nome, descricao)
VALUES (4, 'recolhido', 'Pedido foi recolhido pelo motoboy');  
INSERT INTO public.status (id, nome, descricao)
VALUES (5, 'aguardando pagamento', 'Pedido aguardando pagamento do cliente');  
INSERT INTO public.status (id, nome, descricao)
VALUES (6, 'pago', 'Pedido foi pago');  
INSERT INTO public.status (id, nome, descricao)
VALUES (7, 'finalizado', 'Estado final do pedido');  
INSERT INTO public.status (id, nome, descricao)
VALUES (8, 'orcamento', 'Pedido no estado de orcamento');
```
```sql
select * from pagamentos;
select * from pedidos;
select * from pedidos_roupas;
select * from roupas;
select * from status;
select * from usuarios;
```