function adminMiddleware(req, res, next) {
  if (req.user.perfil !== "admin") {
    return res.status(403).json({ message: "Acesso permitido apenas para administradores." });
  }
  next();
}

function professorMiddleware(req, res, next) {
  if (req.user.perfil !== "professor" && req.user.perfil !== "admin") {
    return res.status(403).json({ message: "Acesso permitido apenas para professores." });
  }
  next();
}

function alunoMiddleware(req, res, next) {
  if (req.user.perfil !== "aluno" && req.user.perfil !== "admin") {
    return res.status(403).json({ message: "Acesso permitido apenas para alunos." });
  }
  next();
}

module.exports = {
  adminMiddleware,
  professorMiddleware,
  alunoMiddleware
};
