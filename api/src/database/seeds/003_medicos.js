/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('medicos').del()
  await knex('medicos').insert([
    {
      nome: "Chrys",
      crm: "254685",
      especializaçao: "neurologista",
      telefone: "(49)99999-5555",
      email: "chrys@gmail.com"
    }
  ]);
};
