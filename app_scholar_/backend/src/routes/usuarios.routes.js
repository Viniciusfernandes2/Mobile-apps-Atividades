const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();
const prisma = new PrismaClient();

// Atualizar senha do usuário logado
router.put('/senha', authMiddleware, async (req, res) => {
  try {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.userId;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ message: "Informe senha atual e nova senha." });
    }

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificar se a senha atual confere
    const senhaConfere = await bcrypt.compare(senhaAtual, user.password);
    if (!senhaConfere) {
      return res.status(401).json({ message: "Senha atual incorreta." });
    }

    // Atualizar senha
    const hash = await bcrypt.hash(novaSenha, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hash }
    });

    return res.json({ message: "Senha atualizada com sucesso!" });

  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
