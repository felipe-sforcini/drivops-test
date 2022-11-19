DROP TABLE carros IF EXISTS;

CREATE TABLE carros(
	id serial primary key,
  nome text not null,
  valor int not null
);

DROP TABLE vendedores IF EXISTS;

CREATE TABLE vendedores(
    id serial primary key,
    nome text not null,
    cpf varchar(11) not null UNIQUE
);

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
	id serial primary key,
  	nome text not null,
  	email text not null , 
  	senha text not null
);

DROP TABLE IF EXISTS vendas;

CREATE TABLE vendas(
  id serial primary key,
  vendedor_id int not null,
  nome_vendedor text not null,
  carro_id int not null,
  carro_nome text not null,
  data_venda date not null,
  valor_venda int not null,
  foreign key(vendedor_id) references vendedores(id),
  foreign key(carro_id) references carros(id)
);


