import { z } from 'zod';
import { ToyIdParam, ToyInputData, ToyUpdateData } from './toys';
import { CartIdParam, CartInputData, CartUpdateData } from './carts';
import { CartItemIdParam, CartItemInputData, CartItemUpdateData } from './cart_items';

export type ToyInput = z.infer<typeof ToyInputData>;
export type ToyUpdate = z.infer<typeof ToyUpdateData>;
export type ToyId = z.infer<typeof ToyIdParam>;

export type CartInput = z.infer<typeof CartInputData>;
export type CartUpdate = z.infer<typeof CartUpdateData>;
export type CartId = z.infer<typeof CartIdParam>;

export type CartItemInput = z.infer<typeof CartItemInputData>;
export type CartItemUpdate = z.infer<typeof CartItemUpdateData>;
export type CartItemId = z.infer<typeof CartItemIdParam>;