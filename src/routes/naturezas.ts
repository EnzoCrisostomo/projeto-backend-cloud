import { Router } from "express";
import NaturezasController from "../controllers/naturezas";

export const naturezasRouter = Router();

naturezasRouter.get("/", NaturezasController.searchNatureza);
naturezasRouter.get("/:id", NaturezasController.detailNatureza);

export default naturezasRouter;