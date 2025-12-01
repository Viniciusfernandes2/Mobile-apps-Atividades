const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:alunoId', async (req, res) => {
  try {
    const alunoId = Number(req.params.alunoId);

    // Buscar aluno
    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId }
    });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado." });
    }

    // Buscar notas + disciplina
    const notas = await prisma.nota.findMany({
      where: { alunoId },
      include: { disciplina: true }
    });

    if (notas.length === 0) {
      return res.json({
        aluno,
        boletim: [],
        situacao_geral: "Sem notas lançadas"
      });
    }

    // Montagem do boletim
    const boletim = notas.map((n) => {
      const media = Number(((n.nota1 + n.nota2) / 2).toFixed(2));
      let situacao = "";

      if (media >= 6) situacao = "Aprovado";
      else if (media >= 4) situacao = "Recuperação";
      else situacao = "Reprovado";

      return {
        disciplina: n.disciplina.nome,
        nota1: n.nota1,
        nota2: n.nota2,
        media,
        situacao
      };
    });

    // Situação geral
    let situacaoGeral = "Aprovado";

    if (boletim.some(b => b.media < 4)) {
      situacaoGeral = "Reprovado";
    } else if (boletim.some(b => b.media < 6)) {
      situacaoGeral = "Recuperação";
    }

    return res.json({
      aluno,
      boletim,
      situacao_geral: situacaoGeral
    });

  } catch (error) {
    console.error("Erro no boletim:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
