"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { currentUser } from "@clerk/nextjs/server";

export const createPost = async ({
  authorId,
  text,
  path,
  parentId,
  groupId,
}: {
  authorId: string;
  text: string;
  path: string;
  parentId?: string;
  groupId?: string;
}) => {
  try {
    const post = await prisma.post.create({
      data: {
        text,
        authorId,
        parentId,
        groupId,
      },
    });

    if (parentId) {
      await prisma.post.update({
        where: {
          id: parentId,
        },
        data: {
          children: {
            connect: {
              id: post.id,
            },
          },
        },
      });
    }

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
        parentId: null,
        groupId: null,
      },
      include: {
        author: true,
        likes: true,
        children: true,
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

export const likePost = async (postId: string, path: string) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated");
    await prisma.like.create({
      data: {
        postId,
        userId: user.id,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to like post: ${error.message}`);
  }
};

export const getPost = async (postId: string) => {
  try {
    return await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        likes: true,
        children: {
          include: {
            author: true,
            likes: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } catch (error: any) {
    console.log(`Failed to fetch post: ${error.message}`);
  }
};
