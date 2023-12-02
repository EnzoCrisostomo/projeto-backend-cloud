import cors from "cors";
import dotenv from "dotenv-safe";
import express from "express";
import path from "path";
import empresasRouter from "./routes/empresas";
import { populateDb } from "./services/populateDb";

const ROOT_PATH = path.resolve(__dirname, "..");
dotenv.config({ path: path.resolve(ROOT_PATH, ".env") });

const PORT = process.env.PORT as string;

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: [`http://localhost:${PORT}`, `https://localhost:${PORT}`] }));
}

app.use(express.json());

app.get("/api", (_, res) => res.send("<bold>Status: ONLINE</bold>"));
app.use("/api/empresas/", empresasRouter);
// app.use("/api/socios/", sociosRouter);

app.listen(PORT, () => {
	if (process.env.NODE_ENV === "development") {
		console.log(`http://localhost:${PORT}/api`);
	}
});
