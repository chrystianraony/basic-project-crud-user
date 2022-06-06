/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      nome: "Chrystian",
      cpf: "25635635625",
      rg: "4564568",
      email: "chrystian@gmail.com",
      cidade: "videira",
    },
    {
      nome: "Vini",
      cpf: "25635635658",
      rg: "4564569",
      email: "vini@gmail.com",
      cidade: "videira",
    },
  ]);
};
