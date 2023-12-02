import { RequestHandler } from "express";
import prisma from "../prisma";
import { SearchEmpresaQuery } from "../schemas/empresas";

const searchEmpresa: RequestHandler = async (req, res) => {
	const { cnpjBasico, razaoSocial, _offset, _size } = SearchEmpresaQuery.parse(req.query);

	try {
		const rows = await prisma.$queryRaw`
			select
        	count(e.*) over() as _total,
        	e.*
      		from empresas e
      		where 	(unaccent(e.cnpj_basico) ilike '%'||unaccent(${cnpjBasico}::text)||'%' or ${cnpjBasico}::text is null) and
            		(unaccent(e.razao_social) ilike '%'||unaccent(${razaoSocial}::text)||'%' or ${razaoSocial}::text is null)
      		order by e.razao_social
      		offset ${_offset}::integer
      		limit ${_size}::integer
		`;

		return res.json(rows);
	} catch (err) {
		return res.status(500).json({ message: "Erro interno do servidor" + err.message });
	}
};

export default {
	searchEmpresa,
};
