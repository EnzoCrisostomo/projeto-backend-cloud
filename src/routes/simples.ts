import { Router } from "express";
import SimplesController from "../controllers/simples";

const simplesRouter = Router();

simplesRouter.get("/", SimplesController.searchSimples);
simplesRouter.get("/", SimplesController.detailSimples);

export default simplesRouter;