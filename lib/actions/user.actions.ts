"use server";

import { prisma } from "../prisma";

export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error: any) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

export const upsertUser = async ({
  id,
  image,
  name,
  username,
  bio,
}: {
  id: string;
  image: string;
  name: string;
  username: string;
  bio: string;
}) => {
  try {
    await prisma.user.upsert({
      where: { id },
      create: {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      update: {},
    });
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
};
