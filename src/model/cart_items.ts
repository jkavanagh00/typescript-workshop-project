import db from '#config/database';
const TABLE = 'cart_items';
import { CartItemId, CartItemInput, CartItemUpdate } from '#schemas/types';

function baseQuery(trx = db) {
  return trx(TABLE);
}

export async function listCartItems() {
  const qb = baseQuery().select('*');
  return qb;
}

export async function createCartItem(cartItemData: CartItemInput) {
  const { cart_id, toy_id, quantity } = cartItemData;
  const newCartItem = await baseQuery().insert({ cart_id, toy_id, quantity }).returning('*');
  return newCartItem[0];
}

export async function updateCartItem(id: CartItemId, cartItemData: CartItemUpdate) {
  const { cart_id, toy_id, quantity } = cartItemData;
  const updatedCartItem = await baseQuery()
    .where({ id })
    .update({ cart_id, toy_id, quantity })
    .returning('*');
  return updatedCartItem[0];
}

export async function deleteCartItem(id: CartItemId) {
  const deletedCartItem = await baseQuery()
    .where({ id })
    .delete()
    .returning('*');
  return deletedCartItem[0];
}