import { z } from "zod";

export const AccountInputData = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const AccountUpdateData = AccountInputData.partial();

export const AccountIdParam = z.object({
  id: z.coerce.number().int().positive("Id must be a positive integer"),
});