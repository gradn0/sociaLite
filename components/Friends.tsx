"use client";
import React from "react";
import UserCard from "./UserCard";
import { removeFriend } from "@/lib/actions/relationship.actions";
import { usePathname } from "next/navigation";
import { UserDetails } from "@/lib/prisma";

const Friends = ({ user }: { user: UserDetails }) => {
  const pathname = usePathname();
  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Friends</h1>
      {user.friends.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {user.friends.map((friend) => (
            <UserCard
              user={friend}
              type="member"
              onRemove={async () =>
                await removeFriend({
                  userId: user.id,
                  friendId: friend.id,
                  path: pathname,
                })
              }
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-1">You don't have any friends yet</p>
      )}
    </div>
  );
};

export default Friends;
