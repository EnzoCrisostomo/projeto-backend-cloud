import { RequestHandler } from "express";
import dbClient from "../services/db";

const getEmpresa: RequestHandler = async (req, res) => {
	const { id } = req.params;

	try {
		const { rows } = await dbClient.query("SELECT * FROM empresas WHERE cnpj_basico=$1", [id]);

		if (rows.length === 0) {
			return res.status(404).json({ message: "Empresa não encontrada" });
		}

		return res.json(rows[0]);
	} catch (err) {
		return res.status(500).json({ message: "Erro interno do servidor" });
	}
};

export default {
	getEmpresa,
};
