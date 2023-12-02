drop database if exists cnpj;
create database cnpj;
use cnpj;

create table cnaes (
    codigo varchar(255) not null unique,
    descricao text not null,
    primary key (codigo)
);

create table naturezas (
    codigo varchar(255) not null unique,
    descricao text not null,
    primary key (codigo)
);

create table qualificacoes (
    codigo varchar(255) not null unique,
    descricao text not null,
    primary key (codigo)
);

create table municipios (
    codigo varchar(255) not null unique,
    descricao text not null,
    primary key (codigo)
);

create table estados (
    codigo varchar(255) not null unique,
    descricao text not null,
    primary key (codigo)
);

create table paizes (
    codigo varchar(255) not null unique,
    descricao text not null,
    primary key (codigo)
);

create table socios (
    id int not null auto_increment unique,
    cnpj_basico varchar(8) not null,
    identificador_socio enum('1', '2', '3') not null,
    nome varchar(255) not null,
    cpf_cnpj varchar(14) not null,
    qualificacao varchar(255) not null,
    data_entrada timestamp not null,
    pais varchar(255) not null,
    cpf_representante_legal varchar(14) not null,
    nome_representante_legal varchar(255) not null,
    qualificacao_representante_legal varchar(255) not null,
    faixa_etaria varchar(255) not null,
    primary key (id)
    foreign key (qualificacao) references qualificacoes(codigo),
    foreign key (pais) references paizes(codigo)
    foreign key (qualificacao_representante_legal) references qualificacoes(codigo)
);

create table simples (
    id int not null auto_increment unique,
    cnpj_basico varchar(8) not null,
    opcao_simples enum('S', 'N', 'EM BRANCO') not null,
    data_opcao timestamp,
    data_exclusao timestamp,
    opcao_mei  enum('S', 'N', 'EM BRANCO') not null,
    data_opcao_mei timestamp,
    data_exclusao_mei timestamp,
    primary key (id)
);

create table estabelecimentos (
    id int not null auto_increment unique,
    cnpj_basico varchar(8) not null,
    cnpj_ordem varchar(4) not null,
    cnpj_dv varchar(2) not null,
    identificador_matriz_filial enum('1', '2') not null,
    situacao_cadastral enum('01', '2', '3', '4', '08') not null,
    data_situacao_cadastral timestamp not null,
    motivo_situacao_cadastral varchar(255) not null,
    nome_cidade_exterior varchar(255) not null,
    pais varchar(255) not null,
    data_inicio_atividade timestamp not null,
    cnae_principal varchar(255) not null,
    cnae_secundaria varchar(255) not null,
    tipo_logradouro varchar(255) not null,
    logradouro varchar(255) not null,
    numero varchar(255) not null,
    complemento varchar(255) not null,
    bairro varchar(255) not null,
    cep varchar(255) not null,
    uf varchar(255) not null,
    municipio varchar(255) not null,
    ddd_1 varchar(255) not null,
    telefone_1 varchar(255) not null,
    ddd_2 varchar(255) not null,
    telefone_2 varchar(255) not null,
    ddd_fax varchar(255) not null,
    fax varchar(255) not null,
    email varchar(255) not null,
    situacao_especial varchar(255) not null,
    data_situacao_especial timestamp,
    primary key (id)
    foreign key (pais) references paizes(codigo)
    -- foreign key (cnae_principal) references cnaes(codigo)
    -- foreign key (cnae_secundaria) references cnaes(codigo)
    foreign key (uf) references estados(codigo)
    foreign key (municipio) references municipios(codigo)
);


create table empresas (
    id int not null auto_increment,
    cnpj_basico varchar(8) not null unique,
    razao_social varchar(255) not null,
    natureza_juridica varchar(255) not null,
    qualificacao_responsavel varchar(255) not null,
    capital_social varchar(255) not null,
    porte enum('00','01','03','05') not null,
    ente_federativo_responsavel varchar(255),
    primary key (id)
    foreign key (natureza_juridica) references naturezas(codigo)
    foreign key (qualificacao_responsavel) references qualificacoes(codigo)
    foreign key (ente_federativo_responsavel) references municipios(codigo)
);