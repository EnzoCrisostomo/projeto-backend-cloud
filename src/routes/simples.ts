import { Router } from "express";
import SimplesController from "../controllers/simples";

const simplesRouter = Router();

simplesRouter.get("/", SimplesController.searchSimples);
simplesRouter.get("/:id", SimplesController.detailSimples);
simplesRouter.post("/", SimplesController.createSimples);
simplesRouter.patch("/:id", SimplesController.updateSimples);

export default simplesRouter;