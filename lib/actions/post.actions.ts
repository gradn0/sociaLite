"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export const createPost = async ({
  authorId,
  text,
  path,
}: {
  authorId: string;
  text: string;
  path: string;
}) => {
  try {
    await prisma.post.create({
      data: {
        text,
        authorId,
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to create post: ${error.message}`);
  }
};

export const getPosts = async (authorId?: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error: any) {
    console.log(`Failed to get post: ${error.message}`);
  }
};
