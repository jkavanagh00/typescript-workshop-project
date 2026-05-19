import { z } from 'zod';

export const CartItemInputData = z.object({
  cart_id: z.coerce.number().int().positive('Cart ID must be a positive integer'),
  toy_id: z.array(z.coerce.number().int().positive('Toy ID must be a positive integer')).optional(),
  quantity: z.coerce.number().int().positive('Quantity must be a positive integer'),
});

export const CartItemUpdateData = CartItemInputData.partial();

export const CartItemIdParam = z.object({
  id: z.coerce.number().int().positive('Id must be a positive integer'),
});