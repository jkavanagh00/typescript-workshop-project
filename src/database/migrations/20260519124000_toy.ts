import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('toy', (t) => {
    t.increments('id').primary;
    t.string('name').notNullable();
    t.string('age_range');
    t.decimal('price', 10, 2).notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('toy');
}
