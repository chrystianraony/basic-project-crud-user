const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex("users");
    return res.json(results);
  },
  async create(req, res, next) {
    try {
      const { nome, cpf, rg, email, cidade } = req.body;

      await knex("users").insert({
        nome,
        cpf,
        rg,
        email,
        cidade,
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
      const { nome, cpf, rg, email, cidade } = req.body;
      const { id } = req.params;
      
      await knex("users").update({ nome, cpf, rg, email, cidade }).where("id", id);
      // await knex("users").update({ cpf }).where("id", id);

      return res.send({ message: "Usuário Atualizado com Sucesso" }); //send significa que esta tudo ok
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.body;

      await knex("users").where({ id: id }).del();

      return res.send({ message: "Usuário Deletado" });
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;

      await knex("users")
        .where("id", id)
        .select("id", "nome", "cpf", "rg", "email", "cidade")
        .first()
        .then((user) => {
          return res.json(user);
        });
    } catch (error) {
      next(error);
    }
  },
};
