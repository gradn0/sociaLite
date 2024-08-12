"use client";
import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { IoMdClose } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/navigation";

type TCardType = "normal" | "request";

const UserCard = ({
  user,
  type,
  onAccept,
  onDeny,
}: {
  user: User;
  type: TCardType;
  onAccept?: () => void;
  onDeny?: () => void;
}) => {
  const router = useRouter();
  return (
    <div
      key={user.id}
      className="bg-light-1 rounded-lg py-4 px-7 shadow-sm flex"
    >
      <span className="cursor-pointer flex items-center gap-4">
        <Image
          src={user.image}
          width={30}
          height={30}
          alt={user.username}
          className="rounded-full size-[35px]"
        />
        <div className="flex flex-col">
          <h2 className="text-base-semibold">{user.username}</h2>
        </div>
      </span>
      {type === "request" && (
        <div className="flex w-1/2 justify-center gap-2 ml-auto">
          <button
            onClick={onAccept}
            className="text-light-1 bg-primary-500 w-full py-1.5 rounded-lg max-w-[300px] flex items-center justify-center gap-2"
          >
            <TiTick />
            Accept
          </button>
          <button
            onClick={onDeny}
            className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px] flex items-center justify-center gap-2"
          >
            <IoMdClose />
            Deny
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
