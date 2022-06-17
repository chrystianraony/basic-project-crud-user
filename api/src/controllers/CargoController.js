const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex("cargos");
    return res.json(results);
  },
  async create(req, res, next) {
    try {
      const { nome } = req.body;

      await knex("cargos").insert({
        nome,
      })
      return res.status(201).send({ message: "Cargo adicionado" }); //201 eh que foi adicionado
    } catch (error) {
      console.log(error)
      if(error.errno === 19) {
        return res.status(401).send({message: "Cargo já cadastrado"})        
     }
    }
  },
  async update(req, res, next) {
    try {
      const { nome } = req.body;
      const { id } = req.params;
      
      await knex("cargos").update({ nome }).where("id", id);
      // await knex("users").update({ cpf }).where("id", id);

      return res.send({ message: "Cargo Atualizado com Sucesso" }); //send significa que esta tudo ok
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("cargos").where({ id: id }).del();

      return res.send({ message: "Cargo Deletado" });
    } catch (error) {
      next(error);
    }
  },
  async get(req, res, next) {
    try {
      const { id } = req.params;

      await knex("cargos")
        .where("id", id)
        .select("id", "nome")
        .first()
        .then((cargo) => {
          return res.json(cargo);
        });
    } catch (error) {
      next(error);
    }
  },
};
