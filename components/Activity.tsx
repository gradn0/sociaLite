"use client";
import { UserDetails } from "@/lib/prisma";
import UserCard from "./UserCard";
import { respondToFriendRequest } from "@/lib/actions/relationship.actions";
import { usePathname } from "next/navigation";

const Activity = ({ user }: { user: UserDetails }) => {
  const pathname = usePathname();
  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Activity</h1>
      <ul className="flex flex-col gap-3">
        {user.requestsRecieved.length < 1 && (
          <p className="text-gray-1">No activity</p>
        )}
        {user.requestsRecieved.map((request) => (
          <UserCard
            key={request.recieverId}
            user={request.sender}
            type="request"
            actionText="sent you a friend request"
            onAccept={async () =>
              await respondToFriendRequest(request.senderId, pathname, "ACCEPT")
            }
            onDeny={async () =>
              await respondToFriendRequest(request.senderId, pathname, "DENY")
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default Activity;
