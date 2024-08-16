"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export const getLoggedInUser = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Not authenticated");
  try {
    const user = await prisma.user.findUnique({
      where: { id: clerkUser?.id },
      include: {
        requestsSent: true,
        requestsRecieved: {
          include: {
            sender: true,
          },
        },
        friends: true,
      },
    });

    return user;
  } catch (error: any) {
    console.log(`Failed to get logged in user: ${error.message}`);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        requestsSent: true,
        requestsRecieved: true,
        friends: true,
      },
    });

    return user;
  } catch (error: any) {
    console.log(`Failed to get user: ${error.message}`);
  }
};

export const upsertUser = async ({
  id,
  image,
  name,
  username,
  bio,
  path,
}: {
  id: string;
  image: string;
  name: string;
  username: string;
  bio: string;
  path: string;
}) => {
  try {
    await prisma.user.upsert({
      where: { id },
      create: {
        id,
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      update: {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
    });

    if (path === "/profile") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(`Failed to create/update user: ${error.message}`);
  }
};
