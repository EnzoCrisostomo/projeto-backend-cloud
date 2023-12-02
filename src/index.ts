import express from "express";
import "express-async-errors";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import prisma from "./prisma";
import handlePrismaError from "./middlewares/handlePrismaError";
import handleCommonError from "./middlewares/handleCommonError";
import handleZodError from "./middlewares/handleZodError";
import path from "path";
import dotenv from "dotenv-safe";
import rootRouter from "./routes";

const PROJECT_ROOT = path.resolve(__dirname, "..");

dotenv.config({
  example: path.resolve(PROJECT_ROOT, ".env.example"),
  path: path.resolve(PROJECT_ROOT, ".env"),
});

const PORT = process.env.PORT;

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors({origin: '*'}));

app.use("/api", rootRouter);

app.use(handleZodError);
app.use(handlePrismaError);
app.use(handleCommonError);

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`Server is running in http://localhost:${PORT}`);
});
