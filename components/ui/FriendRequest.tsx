"use client";
import { respondToFriendRequest } from "@/lib/actions/relationship.actions";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { TiTick } from "react-icons/ti";

const FriendRequest = ({ senderId }: { senderId: string }) => {
  const pathname = usePathname();
  return (
    <div className="flex w-1/2 justify-center gap-2">
      <button
        onClick={async () =>
          await respondToFriendRequest(senderId, pathname, "ACCEPT")
        }
        className="text-light-1 bg-primary-500 w-full py-1.5 rounded-lg max-w-[300px] flex items-center justify-center gap-2"
      >
        <TiTick />
        Accept
      </button>
      <button
        onClick={async () =>
          await respondToFriendRequest(senderId, pathname, "DENY")
        }
        className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px] flex items-center justify-center gap-2"
      >
        <IoMdClose />
        Deny
      </button>
    </div>
  );
};

export default FriendRequest;
