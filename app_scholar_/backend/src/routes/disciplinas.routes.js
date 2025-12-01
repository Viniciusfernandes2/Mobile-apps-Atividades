const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Criar disciplina
router.post('/', async (req, res) => {
  try {
    const { nome, cargaHoraria, professorId } = req.body;

    if (!nome || !cargaHoraria || !professorId) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Verificar se professor existe
    const professor = await prisma.professor.findUnique({
      where: { id: Number(professorId) }
    });

    if (!professor) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    const disciplina = await prisma.disciplina.create({
      data: {
        nome,
        cargaHoraria: Number(cargaHoraria),
        professorId: Number(professorId)
      }
    });

    return res.json({
      message: "Disciplina cadastrada com sucesso!",
      disciplina
    });

  } catch (error) {
    console.error("Erro ao cadastrar disciplina:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Listar disciplinas
router.get('/', async (req, res) => {
  try {
    const disciplinas = await prisma.disciplina.findMany({
      orderBy: { id: 'asc' },
      include: {
        professor: true
      }
    });

    return res.json(disciplinas);

  } catch (error) {
    console.error("Erro ao listar disciplinas:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Atualizar disciplina
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, cargaHoraria, professorId } = req.body;

    const disciplina = await prisma.disciplina.findUnique({ where: { id } });
    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }

    // Atualiza professor, se enviado
    if (professorId) {
      const professor = await prisma.professor.findUnique({
        where: { id: Number(professorId) }
      });
      if (!professor) {
        return res.status(404).json({ message: "Professor não encontrado." });
      }
    }

    const atualizada = await prisma.disciplina.update({
      where: { id },
      data: {
        nome: nome ?? disciplina.nome,
        cargaHoraria: cargaHoraria ? Number(cargaHoraria) : disciplina.cargaHoraria,
        professorId: professorId ? Number(professorId) : disciplina.professorId
      }
    });

    return res.json({
      message: "Disciplina atualizada com sucesso!",
      disciplina: atualizada
    });

  } catch (error) {
    console.error("Erro ao atualizar disciplina:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Deletar disciplina
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const disciplina = await prisma.disciplina.findUnique({ where: { id } });
    if (!disciplina) {
      return res.status(404).json({ message: "Disciplina não encontrada." });
    }

    // Importante: excluir notas vinculadas
    await prisma.nota.deleteMany({
      where: { disciplinaId: id }
    });

    await prisma.disciplina.delete({ where: { id } });

    return res.json({ message: "Disciplina e notas associadas removidas com sucesso." });

  } catch (error) {
    console.error("Erro ao deletar disciplina:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
