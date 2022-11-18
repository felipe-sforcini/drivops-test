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