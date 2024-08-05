"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import Group from "./forms/Group";
import { GroupsWithMembers } from "@/lib/prisma";

const Groups = ({
  groups,
}: {
  groups: GroupsWithMembers | null | undefined;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="main-content">
      <div className="flex gap-4 items-center">
        <h1 className="text-heading3-bold">Groups</h1>
        <button className="p-1.5 bg-primary-500 rounded">
          <IoMdAdd
            color="white"
            onClick={() => setModalOpen(true)}
          />
        </button>
      </div>
      {groups ? (
        <ul className="flex flex-col gap-3">
          {groups.groups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm max-w-[300px]"
            >
              <div className="flex gap-6 items-center">
                <Image
                  src={group.image || "/assets/defaultPhoto.svg"}
                  width={50}
                  height={50}
                  alt={group.name}
                  className="rounded-full size-[55px]"
                />
                <div className="flex flex-col">
                  <h2 className="text-base-semibold">{group.name}</h2>
                </div>
              </div>
              <p className="text-small-regular text-gray-1">{group.bio}</p>
              <ul className="flex">
                {group.members.map((member) => {
                  if (member.id !== "s")
                    return (
                      <Image
                        src={member.image || "/assets/defaultProfile.svg"}
                        width={50}
                        height={50}
                        alt={member.name}
                        className="rounded-full size-[20px]"
                      />
                    );
                })}
              </ul>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-gray-1">You are not part of any groups yet.</p>
      )}
      {modalOpen && (
        <div className="absolute bg-light-1 rounded-lg py-2 px-7 shadow-sm flex gap-6 items-center top-[20%] left-[40%]">
          <Group onComplete={() => setModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Groups;
