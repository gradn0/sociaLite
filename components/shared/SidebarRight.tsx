import React from "react";
import Image from "next/image";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Link from "next/link";

const SidebarRight = async () => {
  const user = await getLoggedInUser();
  if (!user) return null;
  return (
    <div className="sidebar-right">
      {user.friends.length > 0 && (
        <div className="flex flex-col max-lg:hidden p-1 gap-5">
          <h2 className="text-body-bold">Active Friends</h2>
          <ul className="flex flex-col gap-3">
            {user.friends.map((friend, i) => {
              return (
                <Link
                  href={`profile/${friend.id}`}
                  key={i}
                  className="flex items-center py-1 gap-3 cursor-pointer relative"
                >
                  <Image
                    src={friend.image}
                    width={37}
                    height={37}
                    alt={friend.username}
                    className="rounded-full max-lg:mx-auto size-[37px] object-cover"
                  />
                  <span className="size-[0.7em] bg-emerald-500 rounded-full z-10 absolute bottom-1 left-7 border-2 border-white"></span>
                  <p className="text-dark-1 text-base-medium">
                    {friend.username}
                  </p>
                </Link>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarRight;
