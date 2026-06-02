import { z } from 'zod';

export const CartInputData = z.object({
  account_id: z.coerce.number().int().positive('Account ID must be a positive integer'),
  status: z.enum(['active', 'checked_out', 'abandoned'], 'Status must be one of: active, checked_out, abandoned'),
});

export const CartUpdateData = CartInputData.partial();

export const CartIdParam = z.object({
  id: z.coerce.number().int().positive('Id must be a positive integer'),
});
