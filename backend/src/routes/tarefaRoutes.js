// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

const router = express.Router();

// Routes based on schema.prisma model `Task` -> resource `tasks`
router.get("/tasks", TarefaController.listar);
router.get("/tasks/:id", TarefaController.buscarPorId);
router.post("/tasks", TarefaController.criar);
router.put("/tasks/:id", TarefaController.atualizar);
router.delete("/tasks/:id", TarefaController.excluir);

export default router;
