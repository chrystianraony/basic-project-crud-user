const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex("agendamentos");
    return res.json(results);
  },

  async create(req, res, next) {
    try {
      const { medico, paciente, datetime, observacao } = req.body;
      console.log(req.body);

      await knex("agendamentos").insert({
        medico,
        paciente,
        datetime,
        observacao,
      });
      return res.status(201).send({ message: "Agendamento adicionado" }); //201 eh que foi adicionado
    } catch (error) {
      console.log(error);
      if (error.errno === 19) {
        return res.status(401).send({ message: "Agendamento já cadastrado" });
      }
    }
  },
};
