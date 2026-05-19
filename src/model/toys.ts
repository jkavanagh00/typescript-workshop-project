import db from '../config/database.js';
const TABLE = 'toy';

function baseQuery(trx = db) {
  return trx(TABLE);
}

export async function listToys() {
  const qb = baseQuery().select('*');
  return qb;
}

export async function findToyById() {
  const qb = baseQuery().where({ id }).first();
  return qb;
}

export async function createToy(toyData) {
  const { name, age_range, price } = toyData;

  const createdToy = await baseQuery()
    .insert({
      name,
      age_range,
      price,
    })
    .returning('*');

  return createdToy[0];
}
