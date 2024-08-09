"use client";
import React, { useState } from "react";
import Image from "next/image";
import { groupTabs } from "@/constants";
import PostList from "./PostList";
import { GroupsDetails } from "@/lib/prisma";
import UserList from "./UserList";

const Group = ({ group }: { group: GroupsDetails | null | undefined }) => {
  const [activeTab, setActiveTab] = useState(0);
  if (!group) return <p className="text-gray-1">User not found</p>;
  return (
    <div className="main-content">
      <div className="flex flex-col items-center gap-4 bg-light-1 rounded-lg p-7 shadow-sm main-content">
        <Image
          src={group.image || "/assets/defaultPhoto.svg"}
          width={90}
          height={90}
          alt={group.name}
          className="rounded-full border-[4px] border-primary-500-light"
        />
        <h1 className="text-heading3-bold">{group.name}</h1>
        <p className="text-center text-gray-1 max-w-[50ch]">{group.bio}</p>
        <ul className="flex justify-around w-full mt-10 gap-5">
          {groupTabs.map((tab, i) => (
            <div
              className={`flex items-center gap-2 cursor-pointer p-2 flex-1 justify-center rounded ${
                activeTab === i
                  ? "bg-primary-500 text-light-1"
                  : "bg-light-1 text-dark-1"
              }`}
              onClick={() => setActiveTab(i)}
            >
              <Image
                src={tab.icon}
                width={25}
                height={25}
                alt={tab.icon}
              />
              <p>{tab.label}</p>
            </div>
          ))}
        </ul>
      </div>
      {activeTab === 0 && <PostList posts={group.posts} />}
      {activeTab === 1 && <UserList users={group.members} />}
    </div>
  );
};

export default Group;
