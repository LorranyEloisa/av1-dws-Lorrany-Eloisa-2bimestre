// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TaskModel from "../models/tarefaModel.js";

// GET /tasks
export async function listar(req, res) {
  try {
    const tasks = await TaskModel.listar();
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao listar tasks" });
  }
}

// GET /tasks/:id
export async function buscarPorId(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

  try {
    const task = await TaskModel.buscarPorId(id);
    if (!task) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao buscar task" });
  }
}

// POST /tasks
export async function criar(req, res) {
  const { title, description, completed, categoryId } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ erro: "Campo 'title' é obrigatório" });
  }

  const data = {
    title: title.trim(),
    description: description ?? null,
    completed: completed === undefined ? false : Boolean(completed),
    categoryId: categoryId ?? null
  };

  try {
    const created = await TaskModel.criar(data);
    return res.status(201).json(created);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao criar task" });
  }
}

// PUT /tasks/:id
export async function atualizar(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

  const { title, description, completed, categoryId } = req.body;

  const data = {};
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "")
      return res.status(400).json({ erro: "title inválido" });
    data.title = title.trim();
  }
  if (description !== undefined) data.description = description;
  if (completed !== undefined) data.completed = Boolean(completed);
  if (categoryId !== undefined) data.categoryId = categoryId;

  try {
    const updated = await TaskModel.atualizar(id, data);
    if (!updated) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao atualizar task" });
  }
}

// DELETE /tasks/:id
export async function excluir(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

  try {
    const deleted = await TaskModel.excluir(id);
    if (!deleted) return res.status(404).json({ erro: "Task não encontrada" });
    return res.json(deleted);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro ao excluir task" });
  }
}
