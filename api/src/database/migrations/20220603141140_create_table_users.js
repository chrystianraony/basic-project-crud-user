/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments('id')
      table.text('nome').notNullable()
      table.text('cpf').unique().notNullable()
      table.text('rg').unique().notNullable()
      table.text('email').unique().notNullable()
      table.text('cidade').notNullable()
      table.text('senha').notNullable()
      table.text('cargo_id').notNullable()

      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
  
};
