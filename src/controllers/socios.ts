import { RequestHandler } from "express";
import prisma from "../prisma";
import { CreateSociosEntity, SearchSociosParams, SociosEntity, SociosEntityList, UpdateSociosEntity } from "../schemas/socios";
import HttpError from "http-errors";
import { z } from 'zod'
import { mountSearchSet } from "../utils";

const searchSocio: RequestHandler = async (req, res) => {
	const { cnpjBasico, nome, nome_representante_legal, _offset, _size } = SearchSociosParams.parse(req.query);

	const rows = SociosEntityList.parse(await prisma.$queryRaw`
		select
		count(s.*) over() as _total,
		s.*
		from socios s
		where 	(unaccent(s.cnpj_basico) ilike '%'||unaccent(${cnpjBasico}::text)||'%' or ${cnpjBasico}::text is null) and
				(unaccent(s.nome) ilike '%'||unaccent(${nome}::text)||'%' or ${nome}::text is null) and 
				(unaccent(s.nome_representante_legal) ilike '%'||unaccent(${nome_representante_legal}::text)||'%' or ${nome_representante_legal}::text is null)
		order by s.nome
		offset ${_offset}::integer
		limit ${_size}::integer
	`);


	const _total = Number(rows[0]?._total ?? 0);

	for (let item of rows) {
		delete item._total;
	}

	return res.json(mountSearchSet(rows, _offset, _total));
};

const detailSocio: RequestHandler = async (req, res) => {
	const { id } = z.object({ id: z.coerce.number() }).parse(req.params);

	const socio = await prisma.socios.findUnique({
		where: {
			id,
		},
	});

	if (!socio) {
		throw new HttpError.NotFound(`Sócio [${id}] não encontrado!`);
	}

	return res.json(socio);
};

const createSocio: RequestHandler = async (req, res) => {
	const newSocio = CreateSociosEntity.parse(req.body);

	const socio = await prisma.socios.create({
		data: { ...newSocio }
	});

	return res.status(201).json(socio);
};

const updateSocio: RequestHandler = async (req, res) => {
	const { id } = z.object({ id: z.coerce.number() }).parse(req.params);
	const updatedSocio = UpdateSociosEntity.parse(req.body);

	const socio = await prisma.socios.update({
		where: { id },
		data: { ...updatedSocio }
	});

	return res.status(200).json(socio);
};


export default {
	searchSocio,
	detailSocio,
	createSocio,
	updateSocio
};
