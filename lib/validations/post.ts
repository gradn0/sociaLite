import { z } from "zod";

export const postSchema = z.object({
  text: z.string().min(1),
  authorId: z.string(),
});

export const commentSchema = z.object({
  text: z.string().min(1),
  authorId: z.string(),
  parentId: z.string(),
});
