import { z } from 'zod';
import { AccountIdParam, AccountInputData, AccountUpdateData } from './accounts';
import { CartIdParam, CartInputData, CartUpdateData } from './carts';
import { CartItemIdParam, CartItemInputData, CartItemUpdateData } from './cart_items';
import { LoginInputData, RegisterInputData } from './auth';
import { ToyIdParam, ToyInputData, ToyUpdateData } from './toys';
import exp from 'constants';

export type AccountInput = z.infer<typeof AccountInputData>;
export type AccountUpdate = z.infer<typeof AccountUpdateData>;
export type AccountId = z.infer<typeof AccountIdParam>;

export type CartInput = z.infer<typeof CartInputData>;
export type CartUpdate = z.infer<typeof CartUpdateData>;
export type CartId = z.infer<typeof CartIdParam>;

export type CartItemInput = z.infer<typeof CartItemInputData>;
export type CartItemUpdate = z.infer<typeof CartItemUpdateData>;
export type CartItemId = z.infer<typeof CartItemIdParam>;

export type LoginInput = z.infer<typeof LoginInputData>;
export type RegisterInput = z.infer<typeof RegisterInputData>;

export type ToyInput = z.infer<typeof ToyInputData>;
export type ToyUpdate = z.infer<typeof ToyUpdateData>;
export type ToyId = z.infer<typeof ToyIdParam>;