import fs from "fs";

export const populateDb = async () => {
	const tables = [
		"socios",
		"empresas",
		"estabelecimentos",
		// "estados",
		// "motivos",
		// "municipios",
		// "naturezas",
		// "paises",
		// "qualificacoes",
		"simples",
	];

	for (const table of tables) {
		for (const file of fs.readdirSync("./csv/" + table)) {
			fs.readFile(`./csv/${table}/${file}`, "utf8", async (_, data) => {
				// create sql file if not exists
				if (!fs.existsSync("./sql")) {
					fs.mkdirSync("./sql");
				}
				if (!fs.existsSync(`./sql/${table}.sql`)) {
					fs.writeFileSync(`./sql/${table}.sql`, "");
				}

				if (!data) return;

				// Save onto sql file
				data.split("\n").forEach((row) => {
					const data = row
						.split(";")
						.map((r) => `${r.replaceAll("'", "''").replaceAll('"', "'")}`)
						.join(",")
						.replace(/(\r\n|\n|\r)/gm, "");

					if (data === "") return;

					let sql = "";
					switch (table) {
						case "empresas": {
							sql = `INSERT INTO ${table} (cnpj_basico, razao_social, natureza_juridica, qualificacao_responsavel, capital_social, porte, ente_federativo_responsavel) VALUES (${data});\n`;
							break;
						}
						case "estabelecimentos": {
							sql = `INSERT INTO ${table} (cnpj_basico, cnpj_ordem, cnpj_dv, identificador_matriz_filial, situacao_cadastral, data_situacao_cadastral, motivo_situacao_cadastral, nome_cidade_exterior, pais, data_inicio_atividade, cnae_principal, cnae_secundaria, tipo_logradouro, logradouro, numero, complemento, bairro, cep, uf, municipio, ddd_1, telefone_1, ddd_2, telefone_2, ddd_fax, fax, email, situacao_especial, data_situacao_especial) VALUES (${data});\n`;
							break;
						}
						case "simples": {
							sql = `INSERT INTO ${table} (cnpj_basico, opcao_simples, data_opcao, data_exclusao, opcao_mei, data_opcao_mei, data_exclusao_mei) VALUES (${data});\n`;
							break;
						}
						case "socios": {
							sql = `INSERT INTO ${table} (cnpj_basico, identificador_socio, nome, cpf_cnpj, qualificacao, data_entrada, pais, cpf_representante_legal, nome_representante_legal, qualificacao_representante_legal, faixa_etaria) VALUES (${data});\n`;
							break;
						}
					}
					fs.appendFileSync(`./sql/${table}.sql`, sql);
				});
			});
		}
	}
};
