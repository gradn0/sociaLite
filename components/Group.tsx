"use client";
import React, { useState } from "react";
import Image from "next/image";
import { groupTabs } from "@/constants";
import PostList from "./PostList";
import { GroupsDetails } from "@/lib/prisma";
import { User } from "@prisma/client";
import CreatePost from "./forms/CreatePost";
import { FaEdit } from "react-icons/fa";
import GroupForm from "./forms/GroupForm";
import {
  createMembershipRequest,
  removeMember,
  respondToMembershipRequest,
} from "@/lib/actions/group.actions";
import { usePathname } from "next/navigation";
import UserCard from "./UserCard";

const Group = ({
  group,
  user,
}: {
  group: GroupsDetails | null | undefined;
  user: User | null | undefined;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const isAdmin = group?.adminId === user?.id;
  const isMember =
    user && group?.members.find((member) => member.id === user.id);
  const isMembershipRequested = group?.requests.find(
    (user) => user.id === user.id
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const pathname = usePathname();

  if (!group) return <p className="text-gray-1">Group not found</p>;
  return (
    <div className="main-content relative">
      <div className="flex flex-col items-center gap-4 bg-light-1 rounded-lg p-7 shadow-sm main-content">
        <Image
          src={group.image || "/assets/defaultGroup.svg"}
          width={90}
          height={90}
          alt={group.name}
          className="rounded-full object-cover border-[4px] border-primary-500-light size-[90px]"
        />
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-heading3-bold">{group.name}</h1>
          {isAdmin && (
            <FaEdit color="gray" onClick={() => setEditModalOpen(true)} />
          )}
        </div>
        <p className="text-center text-gray-1 max-w-[50ch]">{group.bio}</p>
        {isMember && (
          <ul className="flex justify-around w-full mt-10 gap-5">
            {groupTabs.map((tab, i) => {
              if (tab.label === "Requests" && !isAdmin) return null;
              return (
                <div
                  key={tab.label}
                  className={`flex items-center gap-2 cursor-pointer p-2 flex-1 justify-center rounded ${
                    activeTab === i
                      ? "bg-primary-500 text-light-1"
                      : "bg-light-1 text-dark-1"
                  }`}
                  onClick={() => setActiveTab(i)}
                >
                  <Image src={tab.icon} width={25} height={25} alt={tab.icon} />
                  <p>{tab.label}</p>
                </div>
              );
            })}
          </ul>
        )}
      </div>

      {!isMember && user && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-1">You are not a member of this group</p>
          {isMembershipRequested ? (
            <button className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px]">
              Request sent
            </button>
          ) : (
            <button
              onClick={async () =>
                await createMembershipRequest({
                  userId: user.id,
                  groupId: group.id,
                  path: pathname,
                })
              }
              className="bg-primary-500 text-light-1 w-full py-1.5 rounded-lg max-w-[300px]"
            >
              Send membership request
            </button>
          )}
        </div>
      )}

      {activeTab === 0 && isMember && (
        <div className="flex flex-col gap-4">
          <CreatePost userInfo={user} />
          <PostList posts={group.posts} />
        </div>
      )}

      {activeTab === 1 &&
        group.members.map((member) => (
          <UserCard
            key={member.id}
            user={member}
            type={isAdmin && member.id !== user?.id ? "member" : "normal"}
            onRemove={async () =>
              await removeMember({
                userId: member.id,
                groupId: group.id,
                path: pathname,
              })
            }
          />
        ))}

      {isAdmin &&
        activeTab === 2 &&
        group.requests.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            type="request"
            onAccept={async () =>
              await respondToMembershipRequest({
                groupId: group.id,
                senderId: user.id,
                path: pathname,
                response: "ACCEPT",
              })
            }
            onDeny={async () =>
              await respondToMembershipRequest({
                groupId: group.id,
                senderId: user.id,
                path: pathname,
                response: "DENY",
              })
            }
          />
        ))}

      {editModalOpen && (
        <div className="absolute rounded-lg shadow-sm flex gap-6 items-center top-[10%] left-1/2 -translate-x-1/2 w-[20em]">
          <GroupForm group={group} onComplete={() => setEditModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Group;
