"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import GroupForm from "./forms/GroupForm";
import { GroupsWithMembers } from "@/lib/prisma";
import Link from "next/link";

const Groups = ({
  groups,
}: {
  groups: GroupsWithMembers | null | undefined;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="main-content relative">
      <div className="flex gap-4 items-center">
        <h1 className="text-heading3-bold">Groups</h1>
        <button className="p-1.5 bg-primary-500 rounded">
          <IoMdAdd color="white" onClick={() => setModalOpen(true)} />
        </button>
      </div>
      {groups && groups.groups.length > 0 ? (
        <ul className="flex gap-3 flex-wrap max-sm:justify-center">
          {groups.groups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm max-w-[300px] w-[20em]"
            >
              <Link
                className="flex gap-6 items-center"
                href={`/groups/${group.id}`}
              >
                <Image
                  src={group.image || "/assets/defaultGroup.svg"}
                  width={50}
                  height={50}
                  alt={group.name}
                  className="rounded-full size-[55px] object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-base-semibold">{group.name}</h2>
                </div>
              </Link>
              <p className="text-small-regular text-gray-1">{group.bio}</p>
              <ul className="flex mt-auto">
                {group.members.map((member, i) => {
                  return (
                    <Image
                      key={member.id}
                      src={member.image || "/assets/defaultProfile.svg"}
                      width={50}
                      height={50}
                      alt={member.name}
                      className={`rounded-full size-[23px] bg-light-1 p-[2px] object-cover ${
                        i > 0 && "-translate-x-2"
                      }`}
                    />
                  );
                })}
              </ul>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-gray-1">You are not a member of any groups yet.</p>
      )}
      {modalOpen && (
        <div className="absolute rounded-lg shadow-sm flex gap-6 items-center top-[10%] left-1/2 -translate-x-1/2 w-[20em]">
          <GroupForm onComplete={() => setModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Groups;
