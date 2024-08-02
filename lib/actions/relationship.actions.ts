"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { addFriend } from "../queries/user.queries";

export const createFriendRequest = async (recieverId: string, path: string) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Not authenticated");

    const relationshipExists = await prisma.relationship.findFirst({
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

    if (relationshipExists) throw new Error("Relationship already exists");

    await prisma.relationship.create({
      data: {
        senderId: clerkUser.id,
        recieverId,
        status: "FRIEND_REQUESTED",
      },
    });
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Failed to create friend request: ${error.message}`);
  }
};

type FriendRequestResponse = "ACCEPT" | "DENY";

export const respondToFriendRequest = async (
  senderId: string,
  path: string,
  response: FriendRequestResponse
) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Not authenticated");

    if (response === "ACCEPT") {
      await prisma.relationship.delete({
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
      await prisma.relationship.delete({
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
    console.log(`Failed to create friend request: ${error.message}`);
  }
};
