const knex = require("../database");
const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) return res.status(400).send({ msg: "Campos Inválidos" });
      
      const user = await knex("users")
        .select("senha")
        .where("email", email)
        .first();

      if (!user)
        return res.status(401).send({ error: "Usuário não encontrado" });

      if (!(await bcrypt.compare(senha, user.senha))) {
        return res.status(401).send({ error: "Senha Inválida" });
      }

      const loggedUser = await knex("users")
        .select("nome","cpf","rg","email","cidade","cargo_id")
        .where("email", email)
        .first();

      return res.status(200).send({ message: "Usuário logado com sucesso.", user: loggedUser }); //201 eh que foi adicionado
    } catch (error) {
      console.log(error);
    }
  },
};
