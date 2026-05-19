import type { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('cart').del();

  await knex('cart').insert([
    {
      account_id: 1,
      status: 'active',
    },
    {
      account_id: 2,
      status: 'checked_out',
    },
    {
      account_id: 3,
      status: 'abandoned',
    },
    {
      account_id: 4,
      status: 'active',
    },
    {
      account_id: 5,
      status: 'checked_out',
    },
    {
      account_id: 6,
      status: 'abandoned',
    },
    {
      account_id: 7,
      status: 'active',
    },
    {
      account_id: 8,
      status: 'checked_out',
    },
    {
      account_id: 9,
      status: 'abandoned',
    },
    {
      account_id: 10,
      status: 'active',
    },
  ]);
}
