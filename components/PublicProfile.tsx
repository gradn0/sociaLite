"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserRelationships } from "@/lib/prisma";
import { createFriendRequest } from "@/lib/actions/relationship.actions";
import { usePathname } from "next/navigation";

const PublicProfile = ({
  user,
  postCount,
  clerkId,
}: {
  user: UserRelationships;
  postCount: number;
  clerkId: string;
}) => {
  const isOwnProfile = clerkId === user.id;
  const isRequestSent = !!user.relationshipsRecieved.find(
    (relationship) => relationship.senderId === clerkId
  );
  const isRequestRecieved = !!user.relationshipsSent.find(
    (relationship) => relationship.recieverId === clerkId
  );

  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-4 bg-light-1 rounded-lg p-7 shadow-sm">
      <Image
        src={user.image}
        width={90}
        height={90}
        alt={user.username}
        className="rounded-full border-[4px] border-primary-500-light"
      />
      <h1 className="text-heading3-bold">{user.username}</h1>
      <p className="text-center text-gray-1 max-w-[50ch]">{user.bio}</p>

      <div className="flex gap-5 my-7">
        <div className="flex flex-col items-center px-2">
          <h2 className="text-body-bold">1200</h2>
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

      {isRequestSent && (
        <button className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px]">
          Request sent
        </button>
      )}

      {isRequestRecieved && (
        <button className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px]">
          Request recieved
        </button>
      )}

      {!isOwnProfile && !isRequestSent && !isRequestRecieved && (
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
