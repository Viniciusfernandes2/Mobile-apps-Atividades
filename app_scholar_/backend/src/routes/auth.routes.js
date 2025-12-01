const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Checa se enviou campos
    if (!email || !senha) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    // Busca usuário
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Verifica senha
    const senhaValida = await bcrypt.compare(senha, user.password);
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Gera token
    const token = jwt.sign(
      { userId: user.id, perfil: user.perfil },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login realizado com sucesso!",
      token,
      perfil: user.perfil,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
