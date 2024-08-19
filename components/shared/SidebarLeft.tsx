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
                } ${link.label === "Search" && "md:hidden"}`}
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
    </section>
  );
};

export default SidebarLeft;
