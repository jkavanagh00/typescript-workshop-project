import type { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('account').del();

  await knex('account').insert([
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password_hash: 'hashed_password_1',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password_hash: 'hashed_password_2',
    },
    {
      name: 'Carol Williams',
      email: 'carol@example.com',
      password_hash: 'hashed_password_3',
    },
    {
      name: 'David Brown',
      email: 'david@example.com',
      password_hash: 'hashed_password_4',
    },
    {
      name: 'Eve Davis',
      email: 'eve@example.com',
      password_hash: 'hashed_password_5',
    },
    {
      name: 'Frank Miller',
      email: 'frank@example.com',
      password_hash: 'hashed_password_6',
    },
  ]);
}
