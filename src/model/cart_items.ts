import db from '#config/database';
const TABLE = 'cart_item';
import { CartItemInput, CartItemUpdate } from '#schemas/types';

function baseQuery(trx = db) {
  return trx(TABLE);
}

export async function listCartItems(id: number) {
  const qb = baseQuery().where({ cart_id: id }).select('*');
  return qb;
}

export async function createCartItem(cartItemData: CartItemInput) {
  const { cart_id, toy_id, quantity } = cartItemData;
  const newCartItem = await baseQuery().insert({ cart_id, toy_id, quantity });
  return newCartItem[0];
}

export async function updateCartItem(id: number, cartItemData: CartItemUpdate) {
  const { cart_id, toy_id, quantity } = cartItemData;
  const updatedCartItem = await baseQuery().where({ id }).update({ cart_id, toy_id, quantity });
  return updatedCartItem;
}

export async function deleteCartItem(id: number) {
  const deletedCartItem = await baseQuery().where({ id }).delete();
  return deletedCartItem;
}
