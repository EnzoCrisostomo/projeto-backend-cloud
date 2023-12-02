import { Router } from "express";
import SociosController from "../controllers/socios";

const sociosRouter = Router();

sociosRouter.get("/", SociosController.searchSocio);
sociosRouter.get("/:id", SociosController.detailSocio);
sociosRouter.post("/:", SociosController.createSocio);
sociosRouter.patch("/:id", SociosController.updateSocio);

export default sociosRouter;