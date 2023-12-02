import { Router } from "express";
import EstabelecimentosController from '../controllers/estabelecimentos'

const estabelecimentosRouter = Router();

estabelecimentosRouter.get("/", EstabelecimentosController.searchEstabelecimento);
estabelecimentosRouter.get("/:id", EstabelecimentosController.detailEstabelecimento);

export default estabelecimentosRouter;