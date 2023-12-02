import { RequestHandler } from "express";
import prisma from "../prisma";
import HttpError from "http-errors";
import { z } from "zod";
import { mountSearchSet } from "../utils";
import { QualificacaoEntity, QualificacaoEntityList, SearchQualificacaoParams, UpdateQualificacaoEntity } from "../schemas/qualificacoes";

const searchQualificacao: RequestHandler = async (req, res) => {
	const { descricao, _offset, _size } = SearchQualificacaoParams.parse(req.query);

	const rows = QualificacaoEntityList.parse(await prisma.$queryRaw`
		select
		count(q.*) over() as _total,
		q.*
		from qualificacoes q
		where 	(unaccent(q.descricao) ilike '%'||unaccent(${descricao}::text)||'%' or ${descricao}::text is null)
		order by q.codigo
		offset ${_offset}::integer
		limit ${_size}::integer
	`);

	const _total = Number(rows[0]?._total ?? 0);

	for (let item of rows) {
		delete item._total;
	}

	return res.json(mountSearchSet(rows, _offset, _total));
};

const detailQualificacao: RequestHandler = async (req, res) => {
	const { codigo } = req.params;

	const qualificacao = await prisma.qualificacoes.findUnique({
		where: {
			codigo,
		},
	});

	if (!qualificacao) {
		throw new HttpError.NotFound(`Qualificação [${codigo}] não encontrada!`);
	}

	return res.json(qualificacao);
};

const createQualificacao: RequestHandler = async (req, res) => {
	const { codigo, descricao } = QualificacaoEntity.parse(req.body);

	const qualificacao = await prisma.qualificacoes.create({
		data: { codigo, descricao }
	});

	return res.status(201).json(qualificacao);
};

const updateQualificacao: RequestHandler = async (req, res) => {
	const { codigo } = req.params;
	const updatedQualificacao = UpdateQualificacaoEntity.parse(req.body);

	const qualificacao = await prisma.qualificacoes.update({
		where: { codigo },
		data: { ...updatedQualificacao }
	});

	return res.status(200).json(qualificacao);
};

export default {
	searchQualificacao,
	detailQualificacao,
	createQualificacao,
	updateQualificacao
};