"use client";
import React from "react";
import Image from "next/image";
import { User } from "@prisma/client";
import { IoMdClose } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import Link from "next/link";

type TCardType = "normal" | "request" | "member";

const UserCard = ({
  user,
  type,
  actionText,
  onAccept,
  onDeny,
  onRemove,
}: {
  user: User;
  type: TCardType;
  actionText?: string;
  onAccept?: () => void;
  onDeny?: () => void;
  onRemove?: () => void;
}) => {
  return (
    <div
      key={user.id}
      className="bg-light-1 rounded-lg py-4 px-7 shadow-sm flex items-center"
    >
      <Link
        href={`/profile/${user.id}`}
        className="cursor-pointer flex items-center gap-4"
      >
        <Image
          src={user.image}
          width={30}
          height={30}
          alt={user.username}
          className="rounded-full size-[35px] object-contain"
        />
        <div className="flex flex-col">
          <h2></h2>
          <p className="text-base-regular">
            <span className="text-base-semibold">{user.username} </span>
            {actionText}
          </p>
        </div>
      </Link>
      {type === "request" && (
        <div className="flex w-1/3 justify-center gap-2 ml-auto">
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
      {type === "member" && (
        <p
          onClick={onRemove}
          className="text-subtle-medium ml-auto cursor-pointer text-red-600"
        >
          Remove
        </p>
      )}
    </div>
  );
};

export default UserCard;
