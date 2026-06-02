import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('cart', (t) => {
    t.increments('id').primary;
    t.integer('account_id');
    t.enu('status', ['active', 'checked_out', 'abandoned']);
    t.timestamps(true, true);
  });
}
export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('cart');
}
