/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("medicos", function (table){
    table.increments("id");
    table.text("nome").notNullable;
    table.text("crm").unique().notNullable();
    table.text("especializacao").notNullable();
    table.text("telefone").notNullable();
    table.text("email").unique().notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
