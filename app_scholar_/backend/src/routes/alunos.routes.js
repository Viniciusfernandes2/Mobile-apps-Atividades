const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const router = express.Router();
const prisma = new PrismaClient();

// Gera matrícula aleatória única (7 dígitos)
async function gerarMatriculaUnica() {
  while (true) {
    const matricula = String(Math.floor(Math.random() * 9000000) + 1000000); // 7 dígitos
    const exists = await prisma.aluno.findUnique({ where: { matricula } });
    if (!exists) return matricula;
  }
}

// Normaliza nome para criar email (remove acentos e espaços)
function formatarNomeParaEmail(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // tira acentos
    .replace(/\s+/g, "."); // troca espaços por "."
}

// Criar aluno + user automático
router.post('/', async (req, res) => {
  try {
    const { nome, curso } = req.body;

    if (!nome || !curso) {
      return res.status(400).json({ message: "Nome e curso são obrigatórios." });
    }

    // Gerar matrícula automática
    const matricula = await gerarMatriculaUnica();

    // Criar aluno
    const aluno = await prisma.aluno.create({
      data: { nome, matricula, curso }
    });

    // Criar usuário automático
    const senhaPadrao = "123456";
    const hash = await bcrypt.hash(senhaPadrao, 10);

    const nomeFormatado = formatarNomeParaEmail(nome);
    const email = `${nomeFormatado}_${matricula}@aluno.com`;

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        password: hash,
        perfil: "aluno"
      }
    });

    return res.json({
      message: "Aluno cadastrado com sucesso! Usuário criado automaticamente.",
      aluno,
      usuario_gerado: {
        id: user.id,
        email: user.email,
        senha_inicial: senhaPadrao,
        perfil: user.perfil
      }
    });

  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    return res.status(500).json({ message: "Erro interno no servidor.", error: error.message });
  }
});

// Listar alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      orderBy: { id: 'asc' }
    });
    return res.json(alunos);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// Deletar aluno + deletar usuário associado
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const aluno = await prisma.aluno.findUnique({ where: { id } });
    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado." });
    }

    // Deletar aluno
    await prisma.aluno.delete({ where: { id } });

    // Tentar deletar o user correspondente
    const nomeFormatado = formatarNomeParaEmail(aluno.nome);
    const email = `${nomeFormatado}_${aluno.matricula}@aluno.com`;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      await prisma.user.delete({ where: { email } });
    }

    return res.json({
      message: "Aluno e usuário associado excluídos com sucesso."
    });

  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
