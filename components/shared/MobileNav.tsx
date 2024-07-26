"use client";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <nav className="mobile-nav">
      <ul className="flex gap-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname.includes(link.route);
          return (
            <Link
              key={link.label}
              href={link.route}
              className={`flex items-center gap-4 w-full rounded-lg p-1 ${
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
  );
};

export default MobileNav;