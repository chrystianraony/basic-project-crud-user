const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex('pacientes');
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
        idade
      })
      return res.status(201).send({ message: "Paciente Criado" });
    } catch (error) {
      console.log(error);
      if(error.errno === 19) {
        return res.status(401).send({message: "Email ja cadastrado em outro usuario"});
      }
    }
  },
}