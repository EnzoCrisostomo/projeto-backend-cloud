import { Router } from "express";
import EmpresaController from "../controllers/empresa";

const empresasRouter = Router();

empresasRouter.get("/", EmpresaController.searchEmpresa);
empresasRouter.get("/:id", EmpresaController.detailEmpresa);

export default empresasRouter;