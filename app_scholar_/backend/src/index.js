require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: "API funcionando!" });
});

// Porta
const PORT = process.env.PORT || 4000;

// Alunos routes
const alunosRoutes = require('./routes/alunos.routes');
app.use('/alunos', alunosRoutes);

// Professores routes
const professoresRoutes = require('./routes/professores.routes');
app.use('/professores', professoresRoutes);

// Disciplinas routes
const disciplinasRoutes = require('./routes/disciplinas.routes');
app.use('/disciplinas', disciplinasRoutes);

// Notas routes
const notasRoutes = require('./routes/notas.routes');
app.use('/notas', notasRoutes);


// Boletim routes
const boletimRoutes = require('./routes/boletim.routes');
app.use('/boletim', boletimRoutes);

//usuario routes (****trocar senha****)
const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/usuarios', usuariosRoutes);




app.use('/auth', authRoutes);
app.use('/alunos', alunosRoutes);
app.use('/professores', professoresRoutes);
app.use('/disciplinas', disciplinasRoutes);
app.use('/notas', notasRoutes);
app.use('/boletim', boletimRoutes);
app.use('/usuarios', usuariosRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
