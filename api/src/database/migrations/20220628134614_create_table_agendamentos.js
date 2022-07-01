/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("agendamentos", function (table) {
    table.increments("id");
    table.text("medico_id").notNullable;
    table.text("paciente_id").notNullable;
    table.dateTime("datetime").notNullable;
    table.text("observacao").notNullable;

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
