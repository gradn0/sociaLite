import { User } from "@prisma/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <ul className="flex flex-col gap-3">
      {users.map((user) => (
        <Link
          key={user.id}
          href={`/profile/${user.id}`}
          className="flex items-center bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm"
        >
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
        </Link>
      ))}
    </ul>
  );
};

export default UserList;
