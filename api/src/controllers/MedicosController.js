const knex = require("../database");

module.exports = {
    async index(req, res){
        const results = await knex("medicos")
        return res.json(results);
    },
    async create(req, res, next){
        try {
            const {nome, crm, especializacao, telefone, email} = req.body;
            await knex("medicos").insert({
                nome,
                crm,
                especializacao,
                telefone,
                email,
            })
            return res.status(201).send({ message: "Médico adicionado" }); //201 eh que foi adicionado
    } catch (error) {
      console.log(error)
      if(error.errno === 19) {
        return res.status(401).send({message: "Médico já cadastrado"})        
     }
    }
  },
  async update(req, res, next) {
    try {
      const { nome, crm, especializacao, telefone, email } = req.body;
      const { id } = req.params;
      
      await knex("medicos").update({ nome }).where("id", id);
      await knex("medicos").update({crm}).where("id", id);
      await knex("medicos").update({especializacao}).where("id", id);
      await knex("medicos").update({telefone}).where("id", id);
      await knex("medicos").update({email}).where("id", id);

      return res.send({ message: "Médico Atualizado com Sucesso" }); //send significa que esta tudo ok
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("medicos").where({ id: id }).del();

      return res.send({ message: "Médico Deletado" });
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;

      await knex("medicos")
        .where("id", id)
        .select("id", "nome", "crm", "especializacao", "telefone", "email")
        .first()
        .then((medico) => {
          return res.json(medico);
        });
    } catch (error) {
      next(error);
    }
  },
};








