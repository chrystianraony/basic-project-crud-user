/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('pacientes').del()
    await knex('pacientes').insert([
      {
        medico: "Chrys",
        paciente: "Vini",
        datetime: "20/05/2022",
        observacao: "estamos ai"
      }
    ]);
  };