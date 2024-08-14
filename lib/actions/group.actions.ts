"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getGroups = async (userId: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        groups: {
          include: {
            members: true,
            posts: true,
          },
        },
      },
    });
  } catch (error: any) {
    console.log(`Could not fetch groups: ${error.message}`);
  }
};

export const upsertGroup = async ({
  id,
  image,
  name,
  bio,
  path,
  memberIds,
}: {
  id?: string;
  image?: string;
  name: string;
  bio: string;
  path: string;
  memberIds: string[];
}) => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthenticated");
  try {
    if (memberIds.length < 1) {
      memberIds = [clerkUser.id];
    }

    if (!id) {
      await prisma.group.create({
        data: {
          name,
          bio,
          image,
          adminId: clerkUser.id,
          members: {
            connect: memberIds.map((id) => ({ id })),
          },
        },
      });
      revalidatePath(path);
      return;
    }

    await prisma.group.upsert({
      where: { id },
      create: {
        name,
        bio,
        image,
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
      update: {
        name,
        bio,
        image,
        members: {
          connect: memberIds.map((id) => ({ id })),
        },
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Could not create group: ${error.message}`);
  }
};

export const getGroup = async (id: string) => {
  try {
    return await prisma.group.findUnique({
      where: { id },
      include: {
        members: true,
        posts: {
          include: {
            author: true,
            likes: true,
            children: true,
          },
        },
        requests: true,
      },
    });
  } catch (error: any) {
    console.log(`Could not fetch group: ${error.message}`);
  }
};

export const createMembershipRequest = async ({
  userId,
  groupId,
  path,
}: {
  userId: string;
  groupId: string;
  path: string;
}) => {
  try {
    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        requests: {
          connect: {
            id: userId,
          },
        },
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Could not send membership request: ${error.message}`);
  }
};

export const respondToMembershipRequest = async ({
  groupId,
  senderId,
  path,
  response,
}: {
  groupId: string;
  senderId: string;
  path: string;
  response: TResponseToRequest;
}) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Not authenticated");

    if (response === "ACCEPT") {
      await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          members: {
            connect: {
              id: senderId,
            },
          },
        },
      });
    }

    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        requests: {
          disconnect: {
            id: senderId,
          },
        },
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    console.log(`Could not send membership request: ${error.message}`);
  }
};

export const removeMember = async ({
  userId,
  groupId,
  path,
}: {
  userId: string;
  groupId: string;
  path: string;
}) => {
  try {
    await prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        members: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Could not send membership request: ${error.message}`);
  }
};
