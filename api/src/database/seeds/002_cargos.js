/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("cargos").del()
  await knex("cargos").insert([
    {
      nome:"Meu Cargo",
      cargo:"Meu Cargo",
    },
  
  ]);
};
