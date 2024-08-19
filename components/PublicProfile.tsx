"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserWithSocials } from "@/lib/prisma";
import { createFriendRequest } from "@/lib/actions/relationship.actions";
import { usePathname } from "next/navigation";
import FriendRequest from "./ui/FriendRequest";

const PublicProfile = ({
  user,
  postCount,
  clerkId,
}: {
  user: UserWithSocials;
  postCount: number;
  clerkId: string;
}) => {
  const isOwnProfile = clerkId === user.id;
  const isRequestSent = !!user.requestsRecieved.find(
    (request) => request.senderId === clerkId
  );
  const isRequestRecieved = !!user.requestsSent.find(
    (request) => request.recieverId === clerkId
  );

  const isFriend = !!user.friends.find((friend) => friend.id === clerkId);

  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-4 bg-light-1 rounded-lg p-7 shadow-sm">
      <Image
        src={user.image}
        width={90}
        height={90}
        alt={user.username}
        className="rounded-full border-[4px] border-primary-500-light size-[130px] object-cover"
      />
      <h1 className="text-heading3-bold">{user.username}</h1>
      <p className="text-center text-gray-1 max-w-[50ch]">{user.bio}</p>

      <div className="flex gap-5 my-7">
        <div className="flex flex-col items-center px-2">
          <h2 className="text-body-bold">{user.friends.length}</h2>
          <p className="text-gray-1 text-base-regular">Friends</p>
        </div>
        <span className="border-r-[1px] border-gray-1"></span>
        <div className="flex flex-col items-center px-2">
          <h2 className="text-body-bold">{postCount}</h2>
          <p className="text-gray-1 text-base-regular">Posts</p>
        </div>
      </div>

      {isOwnProfile && (
        <Link
          href="/profile"
          className="w-full flex justify-center"
        >
          <button className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px]">
            Edit Profile
          </button>
        </Link>
      )}

      {isFriend && (
        <p className="text-base-medium">You and {user.username} are friends!</p>
      )}

      {isRequestSent && (
        <button className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px]">
          Request sent
        </button>
      )}

      {isRequestRecieved && (
        <div className="w-full flex flex-col items-center gap-5">
          <p className="text-base-medium">
            {user.username} wants to be friends
          </p>
          <FriendRequest senderId={user.id} />
        </div>
      )}

      {!isOwnProfile && !isRequestSent && !isRequestRecieved && !isFriend && (
        <button
          className="bg-primary-500 text-light-1 w-full py-1.5 rounded-lg max-w-[300px]"
          onClick={async () => await createFriendRequest(user.id, pathname)}
        >
          Send Friend Request
        </button>
      )}
    </div>
  );
};

export default PublicProfile;
