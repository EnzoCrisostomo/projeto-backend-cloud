import csv from "csv";
import fs from "fs";
import dbClient from "./db";

export const populateDb = async () => {
	const parser = csv.parse({ delimiter: ";" });

	//read entire csv folder
	const csvs = fs.readdirSync("./csv");

	// for (const table of csvs) {
	//read each file in folder
	// const folder = fs.readdirSync(`./csv/${table}`);

	// for (const file of folder) {
	// 	fs.createReadStream(`./csv/${table}/${file}`)
	// 		.pipe(parser)
	// 		.on("data", async (row) => {
	// 			// //insert each line in database
	// 			// await dbClient.query(`INSERT INTO ${table} VALUES (${row.map((r) => `'${r}'`).join(",")})`);

	// 			//create sql file if not exists
	// 			if (!fs.existsSync("./sql")) {
	// 				fs.mkdirSync("./sql");
	// 			}
	// 			if (!fs.existsSync(`./sql/${table}.sql`)) {
	// 				fs.writeFileSync(`./sql/${table}.sql`, "");
	// 			}

	// 			// Save onto sql file
	// 			const sql = `INSERT INTO ${table} VALUES (${row.map((r: any) => `'${r}'`).join(",")});\n`;
	// 			fs.appendFileSync(`./sql/${table}.sql`, sql);

	// 		});
	// }

	const tables = [
		// "empresas",
		// "estabelecimentos",
		"estados",
		"motivos",
		"municipios",
		"naturezas",
		"paises",
		"qualificacoes",
		"simples",
		// "socios",
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
				// Save onto sql file
				const rows = data.split("\n");
				const columns = rows[0].split(";");

				rows.shift();

				rows.forEach((row) => {
					const sql = `INSERT INTO ${table} (${columns.join(",")}) VALUES (${row
						.split(";")
						.map((r: any) => `'${r}'`)
						.join(",")});\n`;
					fs.appendFileSync(`./sql/${table}.sql`, sql);
				});
			});
		}
	}
};
