import type { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('account').del();

  await knex('account').insert([
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password_hash: '$2b$12$D24dBcM2GXJPmAZ5ygaWP.7LmPuBCprUs4OlEv0Jo.Oh5ckEMVbW6',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password_hash: '$2b$12$D24dBcM2GXJPmAZ5ygaWP.7LmPuBCprUs4OlEv0Jo.Oh5ckEMVbW6',
    },
    {
      name: 'Carol Williams',
      email: 'carol@example.com',
      password_hash: '$2b$12$D24dBcM2GXJPmAZ5ygaWP.7LmPuBCprUs4OlEv0Jo.Oh5ckEMVbW6',
    },
    {
      name: 'David Brown',
      email: 'david@example.com',
      password_hash: '$2b$12$D24dBcM2GXJPmAZ5ygaWP.7LmPuBCprUs4OlEv0Jo.Oh5ckEMVbW6',
    },
    {
      name: 'Eve Davis',
      email: 'eve@example.com',
      password_hash: '$2b$12$D24dBcM2GXJPmAZ5ygaWP.7LmPuBCprUs4OlEv0Jo.Oh5ckEMVbW6',
    },
    {
      name: 'Frank Miller',
      email: 'frank@example.com',
      password_hash: '$2b$12$D24dBcM2GXJPmAZ5ygaWP.7LmPuBCprUs4OlEv0Jo.Oh5ckEMVbW6',
    },
  ]);
}
