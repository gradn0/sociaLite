import { z } from "zod";

export const groupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Username too short" })
    .max(30, { message: "Username too long" }),
  bio: z.string().max(70, { message: "Bio too long" }),
  image: z.string().url().optional(),
  memberIds: z.string().array(),
});
