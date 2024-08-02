import { prisma } from "../prisma";

export const addFriend = async (userId: string, newFriendId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      friends: {
        connect: {
          id: newFriendId,
        },
      },
    },
  });
};
