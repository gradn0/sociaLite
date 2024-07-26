import { sampleActivity, sampleFriends } from "@/constants";
import React from "react";
import Image from "next/image";

const SidebarRight = () => {
  return (
    <div className="sidebar-right">
      <div className="flex flex-col max-lg:hidden p-1 gap-5">
        <h2 className="text-body-bold">Recent activity</h2>
        <ul className="flex flex-col gap-1">
          {sampleActivity.map((activity, i) => {
            return (
              <div
                key={i}
                className="flex items-center py-1 gap-3 cursor-pointer relative"
              >
                <Image
                  src={`https://fer-uig.glitch.me?uuid=${i}`}
                  width={37}
                  height={37}
                  alt={activity.name}
                  className="rounded-full max-lg:mx-auto"
                />
                <p className="text-base-normal max-w-[20ch]">
                  <span className="text-base-semibold">{activity.name} </span>
                  {activity.action}
                  <span className="text-base-semibold"> {activity.place} </span>
                </p>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col max-lg:hidden p-1 gap-5">
        <h2 className="text-body-bold">Active Friends</h2>
        <ul className="flex flex-col gap-1">
          {sampleFriends.map((friend, i) => {
            return (
              <div
                key={i}
                className="flex items-center py-1 gap-3 cursor-pointer relative"
              >
                <Image
                  src={`https://fer-uig.glitch.me?uuid=${i}`}
                  width={37}
                  height={37}
                  alt={friend.name}
                  className="rounded-full max-lg:mx-auto"
                />
                <span className="size-[0.7em] bg-green-500 rounded-full z-10 absolute bottom-1 left-7 border-2 border-white"></span>
                <p className="text-dark-1 text-base-medium">{friend.name}</p>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidebarRight;
