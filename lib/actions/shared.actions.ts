"use server";

import prisma from "../prisma";

export const search = async ({ query }: { query: string }) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
      },
    });

    const groups = await prisma.group.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });

    return { users, groups };
  } catch (error: any) {
    console.log(`Failed to make search: ${error.message}`);
  }
};
