create table cnaes (
    codigo varchar unique,
    descricao text,
    primary key (codigo)
);

create table naturezas (
    codigo varchar unique,
    descricao text,
    primary key (codigo)
);

create table qualificacoes (
    codigo varchar unique,
    descricao text,
    primary key (codigo)
);

create table municipios (
    codigo varchar unique,
    descricao text,
    primary key (codigo)
);

create table estados (
    codigo varchar unique,
    descricao text,
    primary key (codigo)
);

create table paises (
    codigo varchar unique,
    descricao text,
    primary key (codigo)
);

DO $$ begin
	create type socio_enum as ENUM ('1', '2', '3');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;


create table socios (
    id serial primary key,
    cnpj_basico varchar(8),
    identificador_socio socio_enum,
    nome varchar,
    cpf_cnpj varchar(14),
    qualificacao varchar references qualificacoes(codigo),
    data_entrada timestamp,
    pais varchar references paises(codigo),
    cpf_representante_legal varchar(14),
    nome_representante_legal varchar,
    qualificacao_representante_legal varchar references qualificacoes(codigo),
    faixa_etaria varchar
);

DO $$ begin
    create type opt_simples as ENUM ('S', 'N', 'EM BRANCO');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

create table simples (
    id serial primary key,
    cnpj_basico varchar(8),
    opcao_simples opt_simples,
    data_opcao timestamp,
    data_exclusao timestamp,
    opcao_mei opt_simples,
    data_opcao_mei timestamp,
    data_exclusao_mei timestamp
);

DO $$ begin
    create type id_mat_fil as ENUM ('1', '2');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ begin
    create type sit_cad as ENUM ('01', '2', '3', '4', '08');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

create table estabelecimentos (
    id serial primary key,
    cnpj_basico varchar(8),
    cnpj_ordem varchar(4),
    cnpj_dv varchar(2),
    identificador_matriz_filial id_mat_fil,
    situacao_cadastral sit_cad,
    data_situacao_cadastral timestamp,
    motivo_situacao_cadastral varchar,
    nome_cidade_exterior varchar,
    pais varchar references paises(codigo),
    data_inicio_atividade timestamp,
    cnae_principal varchar,
    cnae_secundaria varchar,
    tipo_logradouro varchar,
    logradouro varchar,
    numero varchar,
    complemento varchar,
    bairro varchar,
    cep varchar,
    uf varchar references estados(codigo),
    municipio varchar references municipios(codigo),
    ddd_1 varchar,
    telefone_1 varchar,
    ddd_2 varchar,
    telefone_2 varchar,
    ddd_fax varchar,
    fax varchar,
    email varchar,
    situacao_especial varchar,
    data_situacao_especial timestamp
);

DO $$ begin
    create type porte_enum as ENUM ('00','01','03','05');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

create table empresas (
    id serial primary key,
    cnpj_basico varchar(8) unique,
    razao_social varchar,
    natureza_juridica varchar references naturezas(codigo),
    qualificacao_responsavel varchar references qualificacoes(codigo),
    capital_social varchar,
    porte porte_enum,
    ente_federativo_responsavel varchar references municipios(codigo)
);