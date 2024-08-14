import { Prisma, PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

export type PostWithLikesAuthors = Prisma.PostGetPayload<{
  include: { author: true; likes: true; children: true };
}>;

export type UserWithSocials = Prisma.UserGetPayload<{
  include: {
    requestsSent: true;
    requestsRecieved: true;
    friends: true;
  };
}>;

export type GroupsWithMembers = Prisma.UserGetPayload<{
  select: {
    groups: {
      include: {
        members: true;
      };
    };
  };
}>;

export type GroupsDetails = Prisma.GroupGetPayload<{
  include: {
    members: true;
    requests: true;
    posts: {
      include: { author: true; likes: true; children: true };
    };
  };
}>;
