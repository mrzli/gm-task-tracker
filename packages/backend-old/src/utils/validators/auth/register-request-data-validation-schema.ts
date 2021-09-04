import { z } from 'zod';
import validator from 'validator';

export const registerRequestDataValidationSchema = z
  .object({
    email: z.string().min(1).max(256).email(),
    password: z
      .string()
      .min(1)
      .max(256)
      .refine((v) => validator.isStrongPassword(v), 'is not a strong password'),
    confirmPassword: z.string().min(1).max(256),
  })
  .strict()
  .refine((v) => v.password === v.confirmPassword, 'passwords do not match');
