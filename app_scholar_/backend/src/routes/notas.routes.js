const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Criar notas
router.post('/', async (req, res) => {
  try {
    const { alunoId, disciplinaId, nota1, nota2 } = req.body;

    if (!alunoId || !disciplinaId || nota1 == null || nota2 == null) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    const aluno = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
    if (!aluno) return res.status(404).json({ message: "Aluno não encontrado." });

    const disciplina = await prisma.disciplina.findUnique({ where: { id: Number(disciplinaId) } });
    if (!disciplina) return res.status(404).json({ message: "Disciplina não encontrada." });

    const nota = await prisma.nota.create({
      data: {
        alunoId: Number(alunoId),
        disciplinaId: Number(disciplinaId),
        nota1: Number(nota1),
        nota2: Number(nota2)
      }
    });

    return res.json({ message: "Notas lançadas!", nota });

  } catch (error) {
    console.error("Erro ao lançar notas:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Listar notas de um aluno
router.get('/aluno/:alunoId', async (req, res) => {
  try {
    const alunoId = Number(req.params.alunoId);

    const notas = await prisma.nota.findMany({
      where: { alunoId },
      include: { disciplina: true }
    });

    return res.json(notas);

  } catch (error) {
    console.error("Erro ao listar notas:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Atualizar notas (professor)
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nota1, nota2 } = req.body;

    const nota = await prisma.nota.findUnique({ where: { id } });
    if (!nota) return res.status(404).json({ message: "Nota não encontrada." });

    const atualizada = await prisma.nota.update({
      where: { id },
      data: {
        nota1: nota1 !== undefined ? Number(nota1) : nota.nota1,
        nota2: nota2 !== undefined ? Number(nota2) : nota.nota2
      }
    });

    return res.json({ message: "Notas atualizadas!", nota: atualizada });

  } catch (error) {
    console.error("Erro ao atualizar nota:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Deletar nota (admin)
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const nota = await prisma.nota.findUnique({ where: { id } });
    if (!nota) return res.status(404).json({ message: "Nota não encontrada." });

    await prisma.nota.delete({ where: { id } });

    return res.json({ message: "Nota removida com sucesso." });

  } catch (error) {
    console.error("Erro ao deletar nota:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
