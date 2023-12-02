import { Router } from "express";
import NaturezasController from "../controllers/naturezas";

export const naturezasRouter = Router();

naturezasRouter.get("/", NaturezasController.searchNatureza);
naturezasRouter.get("/:codigo", NaturezasController.detailNatureza);
naturezasRouter.post("/", NaturezasController.createNatureza);
naturezasRouter.patch("/:codigo", NaturezasController.updateNatureza);

export default naturezasRouter;