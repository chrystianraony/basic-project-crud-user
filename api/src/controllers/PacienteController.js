const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex("pacientes");
    return res.json(results);
  },

  async create(req, res) {
    try {
      const { nome, cpf, telefone, email, sexo, idade } = req.body;

      await knex("pacientes").insert({
        nome,
        cpf,
        telefone,
        email,
        sexo,
        idade,
      });
      return res.status(201).send({ message: "Paciente Criado" });
    } catch (error) {
      console.log(error);
      if (error.errno === 19) {
        return res
          .status(401)
          .send({ message: "Email ja cadastrado em outro usuario" });
      }
    }
  },

  async get(req, res, next) {
    try {
      const { id } = req.params;

      await knex("pacientes")
        .where("id", id)
        .select("id", "nome", "cpf", "telefone", "email", "sexo", "idade")
        .first()
        .then((paciente) => {
          return res.json(paciente);
        });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("pacientes")
      .where({id: id })
      .del();

      return res.send({ message:"Paciente deletado" });
    } catch (error) {
      next(error)
    }
  },
};
