import { Router } from "express";
import EmpresaController from "../controllers/empresa";

const empresasRouter = Router();

empresasRouter.get("/", EmpresaController.getEmpresa);

export default empresasRouter;
