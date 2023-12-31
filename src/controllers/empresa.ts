import { RequestHandler } from "express";
import prisma from "../prisma";
import { CreateEmpresaEntity, EmpresaEntity, EmpresaEntityList, SearchEmpresaParams, UpdateEmpresaEntity } from "../schemas/empresas";
import HttpError from "http-errors";
import { z } from "zod";
import { mountSearchSet } from "../utils";

const searchEmpresa: RequestHandler = async (req, res) => {
	console.log("searchEmpresa");
	const { cnpjBasico, razaoSocial, _offset, _size } = SearchEmpresaParams.parse(req.query);


	const rows = EmpresaEntityList.parse(await prisma.$queryRaw`
		select
		count(e.*) over() as _total,
		e.*
		from empresas e
		where 	(unaccent(e.cnpj_basico) ilike '%'||unaccent(${cnpjBasico}::text)||'%' or ${cnpjBasico}::text is null) and
				(unaccent(e.razao_social) ilike '%'||unaccent(${razaoSocial}::text)||'%' or ${razaoSocial}::text is null)
		order by e.razao_social
		offset ${_offset}::integer
		limit ${_size}::integer
	`);


	const _total = Number(rows[0]?._total ?? 0);

	for (let item of rows) {
		delete item._total;
	}

	return res.status(200).json(mountSearchSet(rows, _offset, _total));
};

const detailEmpresa: RequestHandler = async (req, res) => {
	console.log("detailEmpresa");
	const { id } = z.object({ id: z.coerce.number() }).parse(req.params);

	const empresa = await prisma.empresas.findUnique({
		where: {
			id,
		},
		include: {
			municipios: true,
			naturezas: true,
			qualificacoes: true,
		}
	});

	if (!empresa) {
		throw new HttpError.NotFound(`Empresa [${id}] não encontrada!`);
	}

	return res.status(200).json(empresa);

};

const createEmpresa: RequestHandler = async (req, res) => {
	const {
		capital_social,
		cnpj_basico,
		ente_federativo_responsavel,
		natureza_juridica,
		porte,
		qualificacao_responsavel,
		razao_social
	} = CreateEmpresaEntity.parse(req.body);

	const empresa = await prisma.empresas.create({
		data: {
			capital_social,
			cnpj_basico,
			ente_federativo_responsavel,
			natureza_juridica,
			porte,
			qualificacao_responsavel,
			razao_social
		}
	});

	return res.status(201).json(empresa);
};

const updateEmpresa: RequestHandler = async (req, res) => {
	const { id } = z.object({ id: z.coerce.number() }).parse(req.params);
	const {
		capital_social,
		cnpj_basico,
		ente_federativo_responsavel,
		natureza_juridica,
		porte,
		qualificacao_responsavel,
		razao_social
	} = UpdateEmpresaEntity.parse(req.body);

	const empresa = await prisma.empresas.update({
		where: {
			id
		},
		data: {
			capital_social,
			cnpj_basico,
			ente_federativo_responsavel,
			natureza_juridica,
			porte,
			qualificacao_responsavel,
			razao_social
		}
	});

	return res.status(200).json(empresa);
};


export default {
	searchEmpresa,
	detailEmpresa,
	createEmpresa,
	updateEmpresa
};
