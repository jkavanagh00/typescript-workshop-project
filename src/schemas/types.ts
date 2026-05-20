import { z } from 'zod';
import { AccountInputData, AccountUpdateData } from './accounts';
import { CartInputData, CartUpdateData } from './carts';
import { CartItemInputData, CartItemUpdateData } from './cart_items';
import { LoginInputData } from './auth';
import { ToyInputData, ToyUpdateData } from './toys';

export type AccountInput = z.infer<typeof AccountInputData>;
export type AccountUpdate = z.infer<typeof AccountUpdateData>;

export type CartInput = z.infer<typeof CartInputData>;
export type CartUpdate = z.infer<typeof CartUpdateData>;

export type CartItemInput = z.infer<typeof CartItemInputData>;
export type CartItemUpdate = z.infer<typeof CartItemUpdateData>;

export type LoginInput = z.infer<typeof LoginInputData>;

export type ToyInput = z.infer<typeof ToyInputData>;
export type ToyUpdate = z.infer<typeof ToyUpdateData>;
