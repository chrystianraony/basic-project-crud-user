const knex = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
  async index(req, res) {
    const results = await knex("users AS u")
    .select("u.id", "u.nome", "u.rg", "u.cpf", "u.email", "u.cidade", "u.senha", "u.cargo_id", "c.nome AS cargo_nome", "u.created_at", "u.updated_at")
    .join("cargos AS c", "u.cargo_id", "c.id")
    return res.json(results);
  },
  async create(req, res, next) {
    try {
      const { nome, cpf, rg, email, cidade, senha, cargo_id } = req.body;
    
       let salt = await bcrypt.genSalt(saltRounds)       
       let senhaHash = await bcrypt.hash(senha, salt)

      await knex("users").insert({
        nome,
        cpf,
        rg,
        email,
        cidade,
        senha: senhaHash,
        cargo_id
      })
      return res.status(201).send({ message: "Usuário Criado" }); //201 eh que foi adicionado
    } catch (error) {
      console.log(error)
      if(error.errno === 19) {
        return res.status(401).send({message: "Email ja cadastrado em outro usuario"})        
     }
    }
  },
  async update(req, res, next) {
    try {
      const { nome, cpf, rg, email, cidade, cargo_id } = req.body;
      const { id } = req.params;
      
      await knex("users").update({ nome, cpf, rg, email, cidade, cargo_id }).where("id", id);
      // await knex("users").update({ cpf }).where("id", id);

      return res.send({ message: "Usuário Atualizado com Sucesso" }); //send significa que esta tudo ok
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("users").where({ id: id }).del();

      return res.send({ message: "Usuário Deletado" });
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;

      await knex("users AS u")
        .select("u.id", "u.nome", "u.rg", "u.cpf", "u.email", "u.cidade", "u.cargo_id", "c.nome AS cargo_nome", "u.created_at", "u.updated_at")
        .join("cargos AS c", "u.cargo_id", "c.id")
        .where("u.id", id)
        .first()
        .then((user) => {
          return res.json(user);
        });
    } catch (error) {
      next(error);
    }
  },
};
