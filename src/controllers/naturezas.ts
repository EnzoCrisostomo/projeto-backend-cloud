import { RequestHandler } from "express";
import prisma from "../prisma";
import { NaturezaEntity, NaturezaEntityList, SearchNaturezaParams, UpdateNaturezaEntity } from "../schemas/naturezas";
import HttpError from "http-errors";
import { z } from "zod";
import { mountSearchSet } from "../utils";

const searchNatureza: RequestHandler = async (req, res) => {
	const { descricao, _offset, _size } = SearchNaturezaParams.parse(req.query);

	const rows = NaturezaEntityList.parse(await prisma.$queryRaw`
		select
		count(n.*) over() as _total,
		n.*
		from naturezas n
		where 	(unaccent(n.descricao) ilike '%'||unaccent(${descricao}::text)||'%' or ${descricao}::text is null)
		order by n.codigo
		offset ${_offset}::integer
		limit ${_size}::integer
	`);

	const _total = Number(rows[0]?._total ?? 0);

	for (let item of rows) {
		delete item._total;
	}

	return res.status(200).json(mountSearchSet(rows, _offset, _total));
};

const detailNatureza: RequestHandler = async (req, res) => {
	const { codigo } = req.params;

	const natureza = await prisma.naturezas.findUnique({
		where: {
			codigo,
		},
	});

	if (!natureza) {
		throw new HttpError.NotFound(`Natureza [${codigo}] não encontrada!`);
	}

	return res.status(200).json(natureza);
};

const createNatureza: RequestHandler = async (req, res) => {
	const { codigo, descricao } = NaturezaEntity.parse(req.body);

	const natureza = await prisma.naturezas.create({
		data: {
			codigo,
			descricao
		}
	});

	return res.status(201).json(natureza);
};

const updateNatureza: RequestHandler = async (req, res) => {
	const { codigo } = req.params;
	const { descricao } = UpdateNaturezaEntity.parse(req.body);

	const natureza = await prisma.naturezas.update({
		where: {
			codigo
		},
		data: {
			descricao
		}
	});

	return res.status(200).json(natureza);
};

export default {
	searchNatureza,
	detailNatureza,
	createNatureza,
	updateNatureza
};
