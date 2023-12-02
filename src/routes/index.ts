import { Router } from "express";
import empresasRouter from "./empresas";
import estabelecimentosRouter from './estabelecimentos'
import naturezasRouter from "./naturezas";
import qualificacoesRouter from "./qualificacoes";
import sociosRouter from "./socios";
import simplesRouter from "./simples";

const rootRouter = Router();

rootRouter.use("/empresa", empresasRouter);
rootRouter.use("/estabelecimento", estabelecimentosRouter);
rootRouter.use("/natureza", naturezasRouter);
rootRouter.use("/qualificacao", qualificacoesRouter);
rootRouter.use("/simples", simplesRouter);
rootRouter.use("/socio", sociosRouter);

export default rootRouter;