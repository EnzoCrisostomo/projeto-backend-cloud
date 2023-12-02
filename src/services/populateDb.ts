import csv from "csv";
import fs from "fs";
import dbClient from "./db";

export const populateDb = async () => {
	const parser = csv.parse({ delimiter: ";" });

	const tables = [
		"empresas",
		"estabelecimentos",
		// "estados",
		// "motivos",
		// "municipios",
		// "naturezas",
		// "paises",
		// "qualificacoes",
		// "simples",
		"socios",
	];

	for (const table of tables) {
		for (const file of fs.readdirSync("./csv/" + table)) {
			fs.readFile(`./csv/${table}/${file}`, "utf8", async (err, data) => {
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

					const sql = `INSERT INTO ${table} VALUES (${data});\n`;
					fs.appendFileSync(`./sql/${table}.sql`, sql);
				});
			});
		}
	}
};
