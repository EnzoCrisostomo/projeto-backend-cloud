import { RequestHandler } from "express";
import prisma from "../prisma";
import { CreateEstabelecimentoEntity, EstabelecimentoEntity, EstabelecimentoEntityList, SearchEstabelecimentoParams, UpdateEstabelecimentoEntity } from "../schemas/estabelecimentos";
import HttpError from "http-errors";
import { z } from "zod";
import { mountSearchSet } from "../utils";

const searchEstabelecimento: RequestHandler = async (req, res) => {
	const { cnpjBasico, logradouro, email, _offset, _size } = SearchEstabelecimentoParams.parse(req.query);

	const rows = EstabelecimentoEntityList.parse(await prisma.$queryRaw`
		select
		count(e.*) over() as _total,
		e.*
		from estabelecimentos e
		where 	(unaccent(e.cnpj_basico) ilike '%'||unaccent(${cnpjBasico}::text)||'%' or ${cnpjBasico}::text is null) and
				(unaccent(e.logradouro) ilike '%'||unaccent(${logradouro}::text)||'%' or ${logradouro}::text is null) and
				(unaccent(e.email) ilike '%'||unaccent(${email}::text)||'%' or ${email}::text is null)
		order by e.id
		offset ${_offset}::integer
		limit ${_size}::integer
	`);


	const _total = Number(rows[0]?._total ?? 0);

	for (let item of rows) {
		delete item._total;
	}

	return res.json(mountSearchSet(rows, _offset, _total));

};

const detailEstabelecimento: RequestHandler = async (req, res) => {
	const { id } = z.object({ id: z.coerce.number() }).parse(req.params);

	const estabelecimento = await prisma.estabelecimentos.findUnique({
		where: {
			id,
		},
	});

	if (!estabelecimento) {
		throw new HttpError.NotFound(`Estabelecimento [${id}] não encontrado!`);
	}

	return res.json(estabelecimento);
};

const createEstabelecimento: RequestHandler = async (req, res) => {
	const newEstabelecimento = CreateEstabelecimentoEntity.parse(req.body);

	const estabelecimento = await prisma.estabelecimentos.create({
		data: { ...newEstabelecimento }
	});

	return res.status(201).json(estabelecimento);
};

const updateEstabelecimento: RequestHandler = async (req, res) => {
	const { id } = z.object({ id: z.coerce.number() }).parse(req.params);
	const updatedEstabelecimento = UpdateEstabelecimentoEntity.parse(req.body);

	const estabelecimento = await prisma.empresas.update({
		where: { id },
		data: { ...updatedEstabelecimento }
	});

	return res.status(200).json(estabelecimento);
};

export default {
	searchEstabelecimento,
	detailEstabelecimento,
	createEstabelecimento,
	updateEstabelecimento
};
