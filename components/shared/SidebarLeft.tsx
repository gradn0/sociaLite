"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLeft = () => {
  const pathname = usePathname();

  return (
    <section className="sidebar-left">
      <nav>
        <ul className="flex flex-col gap-3">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
              <Link
                key={link.label}
                href={link.route}
                className={`flex items-center gap-4 w-full rounded-lg p-1 lg:pl-4 lg:pr-10 ${
                  isActive && "bg-gray-300"
                }`}
              >
                <Image
                  src={link.imgURL}
                  width={37}
                  height={37}
                  alt={link.label}
                  className="p-2 rounded-full max-lg:mx-auto"
                  style={{ backgroundColor: link.background }}
                />
                <p className="text-dark-1 text-base-medium max-lg:hidden">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </ul>
      </nav>

      {/* <div className="flex flex-col max-lg:hidden p-1 gap-5">
        <h2 className="text-body-bold">My Groups</h2>
        <ul className="flex flex-col gap-1">
          {sampleGroups.map((group, i) => {
            return (
              <div
                key={i}
                className="flex items-center py-1 gap-3 cursor-pointer"
              >
                <Image
                  src={`https://fer-uig.glitch.me?uuid=${i}`}
                  width={37}
                  height={37}
                  alt={group.name}
                  className="rounded-full max-lg:mx-auto"
                />
                <p className="text-dark-1 text-base-medium">{group.name}</p>
              </div>
            );
          })}
        </ul>
      </div> */}
    </section>
  );
};

export default SidebarLeft;
