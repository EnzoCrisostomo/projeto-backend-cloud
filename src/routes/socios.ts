import { Router } from "express";
import SociosController from "../controllers/socios";

const sociosRouter = Router();

sociosRouter.get("/", SociosController.searchSocio);
sociosRouter.get("/:id", SociosController.detailSocio);

export default sociosRouter;