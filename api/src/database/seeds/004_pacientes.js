/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pacientes').del()
  await knex('pacientes').insert([
    {
      nome: "Chrys",
      cpf: "254685",
      telefone: "(49)99999-5555",
      email: "chrys@gmail.com",
      sexo: "masculino",
      idade: "20"
    }
  ]);
};