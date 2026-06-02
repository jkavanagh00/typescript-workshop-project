import db from '#config/database';
const TABLE = 'toy';
import { ToyInput, ToyUpdate } from '#schemas/types';

function baseQuery(trx = db) {
  return trx(TABLE);
}

export async function listToys() {
  const qb = baseQuery().select('*');
  return qb;
}

export async function findToyById(id: number) {
  const qb = baseQuery().where({ id }).first();
  return qb;
}

export async function createToy(toyData: ToyInput) {
  const { name, age_range, price } = toyData;

  const createdToy = await baseQuery()
    .insert({
      name,
      age_range,
      price,
    });

  return createdToy[0];
}

export async function updateToy(id: number, toyData: ToyUpdate) {
  const { name, age_range, price } = toyData;

  const updatedToy = await baseQuery()
    .where({ id })
    .update({
      name,
      age_range,
      price,
    });

  return updatedToy;
}

export async function deleteToy(id: number) {
  const deletedToy = await baseQuery()
    .where({ id })
    .delete();

  return deletedToy;
}