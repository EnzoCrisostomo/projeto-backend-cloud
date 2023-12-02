import { RequestHandler } from "express";
import prisma from "../prisma";
import HttpError from "http-errors";
import { z } from "zod";
import { mountSearchSet } from "../utils";
import { SearchSimplesParams, SimplesEntity, SimplesEntityList } from "../schemas/simples";

const searchSimples: RequestHandler = async (req, res) => {
	const { cnpjBasico, _offset, _size } = SearchSimplesParams.parse(req.query);

	const rows = SimplesEntityList.parse(await prisma.$queryRaw`
		select
		count(s.*) over() as _total,
		s.*
		from simples s
		where 	(unaccent(s.cnpj_basico) ilike '%'||unaccent(${cnpjBasico}::text)||'%' or ${cnpjBasico}::text is null)
		order by s.data_opcao
		offset ${_offset}::integer
		limit ${_size}::integer
	`);

	const _total = Number(rows[0]?._total ?? 0);

	for (let item of rows) {
		delete item._total;
	}

	return res.json(mountSearchSet(rows, _offset, _total));
};

const detailSimples: RequestHandler = async (req, res) => {
	const { id } = z.object({ id: z.coerce.number() }).parse(req.params);

	const simples = SimplesEntity.parse(await prisma.simples.findUnique({
		where: {
			id,
		},
	}));

	if (!simples) {
		throw new HttpError.NotFound(`Simples [${id}] não encontrado!`);
	}

	return res.json(simples);
};

export default {
	searchSimples,
	detailSimples
};