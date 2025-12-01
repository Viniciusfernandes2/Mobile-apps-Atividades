const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Criando usuários...");

  // SENHA PADRÃO PARA TODOS
  const senhaPadrao = "123456";
  const hash = await bcrypt.hash(senhaPadrao, 10);

  // ADMIN
  await prisma.user.create({
    data: {
      nome: "Administrador",
      email: "admin@teste.com",
      password: hash,
      perfil: "admin"
    }
  });

  // PROFESSOR
  await prisma.user.create({
    data: {
      nome: "Professor João",
      email: "professor@teste.com",
      password: hash,
      perfil: "professor"
    }
  });

  // ALUNO
  await prisma.user.create({
    data: {
      nome: "Aluno Pedro",
      email: "aluno@teste.com",
      password: hash,
      perfil: "aluno"
    }
  });

  console.log("✅ Seed executado com sucesso!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
