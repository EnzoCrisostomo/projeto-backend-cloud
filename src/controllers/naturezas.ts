import { RequestHandler } from "express";
import prisma from "../prisma";
import { NaturezaEntity, NaturezaEntityList, SearchNaturezaParams } from "../schemas/naturezas";
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

	return res.json(mountSearchSet(rows, _offset, _total));
};

const detailNatureza: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const natureza = await prisma.naturezas.findUnique({
		where: {
			codigo: id,
		},
	});

	if (!natureza) {
		throw new HttpError.NotFound(`Natureza [${id}] não encontrada!`);
	}

	return res.json(natureza);
};

export default {
	searchNatureza,
	detailNatureza
};
