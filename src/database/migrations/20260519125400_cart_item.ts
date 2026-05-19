import type { Knex } from 'knex';

export async function up(knex: Knex) {
  await knex.schema.createTable('cart_item', (t) => {
    t.increments('id').primary;
    t.integer('toy_id').notNullable().references('id').inTable('toy');
    t.integer('cart_id').notNullable().references('id').inTable('cart');
    t.integer('quantity').notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTableIfExists('cart_item');
}
