"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { addFriend } from "../queries/user.queries";

export const createFriendRequest = async (recieverId: string, path: string) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Not authenticated");

    const requestExists = await prisma.request.findFirst({
      where: {
        OR: [
          {
            senderId: clerkUser.id,
            recieverId,
          },
          {
            senderId: recieverId,
            recieverId: clerkUser.id,
          },
        ],
      },
    });

    if (requestExists) throw new Error("Request already exists");

    await prisma.request.create({
      data: {
        senderId: clerkUser.id,
        recieverId,
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to create friend request: ${error.message}`);
  }
};

export const respondToFriendRequest = async (
  senderId: string,
  path: string,
  response: TResponseToRequest
) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Not authenticated");

    if (response === "ACCEPT") {
      await prisma.request.delete({
        where: {
          senderId_recieverId: {
            senderId,
            recieverId: clerkUser.id,
          },
        },
      });

      await addFriend(clerkUser.id, senderId);
      await addFriend(senderId, clerkUser.id);
    } else {
      await prisma.request.delete({
        where: {
          senderId_recieverId: {
            senderId,
            recieverId: clerkUser.id,
          },
        },
      });
    }

    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to accept/deny friend request: ${error.message}`);
  }
};
