import type { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('toy').del();

  await knex('toy').insert([
    {
      name: 'Teddy Bear',
      age_range: '2+',
      price: 150,
    },
    {
      name: 'Wooden Train Set',
      age_range: '3+',
      price: 280,
    },
    {
      name: 'Building Blocks',
      age_range: '1+',
      price: 120,
    },
    {
      name: 'Remote Control Car',
      age_range: '6+',
      price: 450,
    },
    {
      name: 'Puzzle Adventure',
      age_range: '5+',
      price: 95,
    },
    {
      name: 'Dinosaur Figure Set',
      age_range: '4+',
      price: 210,
    },
    {
      name: 'Magic Coloring Book',
      age_range: '3+',
      price: 75,
    },
    {
      name: 'Mini Basketball Hoop',
      age_range: '7+',
      price: 330,
    },
    {
      name: 'Science Kit',
      age_range: '8+',
      price: 520,
    },
    {
      name: 'Plush Rabbit',
      age_range: '2+',
      price: 160,
    },
  ]);
}
