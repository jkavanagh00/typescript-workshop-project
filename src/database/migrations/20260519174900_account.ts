import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('account', (t) => {
    t.increments('id').primary;
    t.string('name').notNullable();
    t.string('email').notNullable().unique();
    t.string('password').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('account');
}