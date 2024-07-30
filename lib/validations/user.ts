import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username too short" })
    .max(30, { message: "Username too long" }),
  name: z
    .string()
    .min(3, { message: "Name too short" })
    .max(30, { message: "Name too long" }),
  bio: z.string().max(30, { message: "Name too long" }),
  image: z.string().url().min(1),
});
