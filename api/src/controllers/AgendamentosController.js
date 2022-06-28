const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex("agendamentos AS ag")
    .select("ag.id", "m.nome", "pac.nome AS paciente_nome", "ag.datetime", "ag.observacao", "ag.created_at", "ag.update_at")
    .join("medicos AS m", "ag.medico_id", "m.id")
    .join("paciente AS pac", "ag.paciente_id", "pac.id")
    return res.json(results);
  },

  async create(req, res, next) {
    try {
      const { medico_id, paciente_id, datetime, observacao } = req.body;
      console.log(req.body);

      await knex("agendamentos").insert({
        medico_id,
        paciente_id,
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
  async update(req, res, next) {
    try {
      const { medico_id, paciente_id, datetime, observacao } = req.body;
      const { id } = req.params;
      
      await knex("agendamentos").update({ medico_id }).where("id", id);
      await knex("agendamentos").update({paciente_id}).where("id", id);
      await knex("agendamentos").update({datetime}).where("id", id);
      await knex("agendamentos").update({observacao}).where("id", id);
      // await knex("users").update({ cpf }).where("id", id);

      return res.send({ message: "Agendamento Atualizado com Sucesso" }); //send significa que esta tudo ok
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("agendamentos").where({ id: id }).del();

      return res.send({ message: "Agendamento Deletado" });
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;

      await knex("agendamentos AS ag")
        .select("ag.id", "m.nome", "paciente_nome", "ag.datetime", "ag.observacao", "ag.created_at", "ag.update_at")
        .join("medicos AS m", "ag.medico_id", "m.id")
        .join("paciente AS pac", "ag.paciente_id", "pac.id")
        .where("ag.id",id)
        .first()
        .then((agenda) => {
          return res.json(agenda);
        });
    } catch (error) {
      next(error);
    }
  },
};
