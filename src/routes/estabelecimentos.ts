import { Router } from "express";
import EstabelecimentosController from '../controllers/estabelecimentos'

const estabelecimentosRouter = Router();

estabelecimentosRouter.get("/", EstabelecimentosController.searchEstabelecimento);
estabelecimentosRouter.get("/:id", EstabelecimentosController.detailEstabelecimento);
estabelecimentosRouter.post("/", EstabelecimentosController.createEstabelecimento);
estabelecimentosRouter.patch("/:id", EstabelecimentosController.updateEstabelecimento);

export default estabelecimentosRouter;