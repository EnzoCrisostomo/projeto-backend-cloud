import { Router } from "express";
import QualificacoesController from "../controllers/qualificacoes";

const qualificacoesRouter = Router();

qualificacoesRouter.get("/", QualificacoesController.searchQualificacao);
qualificacoesRouter.get("/:codigo", QualificacoesController.detailQualificacao);
qualificacoesRouter.post("/", QualificacoesController.createQualificacao);
qualificacoesRouter.patch("/:codigo", QualificacoesController.updateQualificacao);

export default qualificacoesRouter;