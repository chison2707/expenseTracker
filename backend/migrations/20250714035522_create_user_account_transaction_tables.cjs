/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('tbluser', (table) => {
    table.increments('id').primary();
    table.string('email', 120).notNullable().unique();
    table.string('firstName', 50).notNullable();
    table.string('lastName', 50);
    table.string('phoneNumber', 15);
    table.specificType('accounts', 'TEXT[]');
    table.text('password');
    table.string('provider', 10);
    table.text('country');
    table.string('currency', 5).notNullable().defaultTo('VND');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    table.string('tokenuser', 20);
  });

  await knex.schema.createTable('tblaccount', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('tbluser').onDelete('CASCADE');
    table.string('account_name', 50).notNullable();
    table.string('account_number', 50).notNullable();
    table.decimal('account_balance', 10, 2).notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('tbltransaction', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('tbluser').onDelete('CASCADE');
    table.text('description').notNullable();
    table.string('status', 10).notNullable().defaultTo('Pending');
    table.string('source', 100).notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.string('type', 10).notNullable().defaultTo('income');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('tbltransaction');
  await knex.schema.dropTableIfExists('tblaccount');
  await knex.schema.dropTableIfExists('tbluser');
};
