import React from "react";
import Searchbar from "../ui/Searchbar";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { RiLogoutCircleLine } from "react-icons/ri";

const Header = () => {
  return (
    <nav className="header">
      <Link
        href={"/"}
        className="flex gap-2"
      >
        <Image
          src={"/assets/logo.png"}
          alt="logo"
          width={28}
          height={28}
        />
        <h1 className="text-heading3-bold text-dark-1 max-sm:hidden">
          Socia<span className="text-primary-500">Lite</span>
        </h1>
      </Link>
      <Searchbar />
      <SignedIn>
        <div className="flex items-center gap-5">
          <UserButton />
          <SignOutButton>
            <RiLogoutCircleLine
              size={20}
              className="md:hidden"
            />
          </SignOutButton>
        </div>
      </SignedIn>
    </nav>
  );
};

export default Header;
