import type { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('cart_item').del();

  await knex('cart_item').insert([
    { toy_id: 1, cart_id: 2, quantity: 4 },
    { toy_id: 2, cart_id: 1, quantity: 2 },
    { toy_id: 3, cart_id: 1, quantity: 1 },
    { toy_id: 2, cart_id: 3, quantity: 5 },
    { toy_id: 1, cart_id: 3, quantity: 3 },
    { toy_id: 4, cart_id: 4, quantity: 2 },
    { toy_id: 5, cart_id: 5, quantity: 6 },
    { toy_id: 6, cart_id: 6, quantity: 1 },
    { toy_id: 7, cart_id: 7, quantity: 3 },
    { toy_id: 8, cart_id: 8, quantity: 2 },
  ]);
}
