const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const router = express.Router();
const prisma = new PrismaClient();

// NORMALIZA NOME PARA USAR EM EMAIL
function formatarNomeParaEmail(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, ".");
}

// Criar professor + usuário
router.post('/', async (req, res) => {
  try {
    const { nome, titulacao, tempoDocencia } = req.body;

    if (!nome || !titulacao || !tempoDocencia) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Criar professor
    const professor = await prisma.professor.create({
      data: {
        nome,
        titulacao,
        tempoDocencia: Number(tempoDocencia)
      }
    });

    // Criar usuário associado
    const senhaPadrao = "123456";
    const hash = await bcrypt.hash(senhaPadrao, 10);

    const nomeFormatado = formatarNomeParaEmail(nome);
    const email = `${nomeFormatado}_${professor.id}@prof.com`;

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: hash,
        perfil: "professor"
      }
    });

    return res.json({
      message: "Professor cadastrado com sucesso! Usuário criado automaticamente.",
      professor,
      usuario_gerado: {
        id: user.id,
        email: user.email,
        senha_inicial: senhaPadrao,
        perfil: user.perfil
      }
    });

  } catch (error) {
    console.error("Erro ao cadastrar professor:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Listar professores
router.get('/', async (req, res) => {
  try {
    const professores = await prisma.professor.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json(professores);
  } catch (error) {
    console.error("Erro ao listar professores:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Deletar professor + deletar usuário associado
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const professor = await prisma.professor.findUnique({ where: { id } });
    if (!professor) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }

    // Remover professor
    await prisma.professor.delete({ where: { id } });

    // Identificar email do user associado
    const nomeFormatado = formatarNomeParaEmail(professor.nome);
    const email = `${nomeFormatado}_${professor.id}@prof.com`;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      await prisma.user.delete({ where: { email } });
    }

    return res.json({ message: "Professor e usuário associado excluídos com sucesso." });

  } catch (error) {
    console.error("Erro ao deletar professor:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
