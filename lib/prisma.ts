import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma;

export type PostWithLikesAuthors = Prisma.PostGetPayload<{
  include: { author: true; likes: true; children: true };
}>;

export type UserWithSocials = Prisma.UserGetPayload<{
  include: {
    relationshipsRecieved: true;
    relationshipsSent: true;
    friends: true;
  };
}>;
