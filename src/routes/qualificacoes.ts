import { Router } from "express";
import QualificacoesController from "../controllers/qualificacoes";

const qualificacoesRouter = Router();

qualificacoesRouter.get("/", QualificacoesController.searchQualificacao);
qualificacoesRouter.get("/:id", QualificacoesController.detailQualificacao);

export default qualificacoesRouter;