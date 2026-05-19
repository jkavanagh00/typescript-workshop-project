import db from '#config/database';
const TABLE = 'cart';
import { CartInput, CartUpdate } from '#schemas/types';

function baseQuery(trx = db) {
  return trx(TABLE);
}

export async function listCarts() {
  const qb = baseQuery().select('*');
  return qb;
}

export async function findCartById(id: number) {
  const qb = baseQuery().where({ id }).first();
  return qb;
}

export async function findCartByAccountId(id: number) {
  const qb = baseQuery().where({ account_id: id }).first();
  return qb;
}

export async function createCart(cartData: CartInput) {
  const { account_id, status } = cartData;
  const newCart = await baseQuery().insert({ account_id, status }).returning('*');
  return newCart[0];
}

export async function updateCart(id: number, cartData: CartUpdate) {
  const { account_id, status } = cartData;
  const updatedCart = await baseQuery()
    .where({ id })
    .update({ account_id, status })
    .returning('*');
  return updatedCart[0];
}

export async function deleteCart(id: number) {
  const deletedCart = await baseQuery()
    .where({ id })
    .delete()
    .returning('*');
  return deletedCart[0];
}