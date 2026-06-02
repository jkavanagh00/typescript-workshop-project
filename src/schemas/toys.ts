import { z } from 'zod';

export const ToyInputData = z.object({
  name: z.string().min(3, 'Toy name must be at least 3 letters'),
  age_range: z.string().trim().min(1).optional(),
  price: z.number().min(0, 'Price must be a non-negative number'),
});

export const ToyUpdateData = ToyInputData.partial();

export const ToyIdParam = z.object({
  id: z.coerce.number().int().positive('Id must be a positive integer'),
});
