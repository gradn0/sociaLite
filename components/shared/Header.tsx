import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { RiLogoutCircleLine } from "react-icons/ri";
import Searchbar from "../forms/Searchbar";

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
      <span className="hidden md:flex">
        <Searchbar />
      </span>
      <SignedIn>
        <div className="flex items-center gap-5">
          <UserButton />
          <SignOutButton>
            <RiLogoutCircleLine
              size={20}
              className="md:hidden cursor-pointer"
            />
          </SignOutButton>
        </div>
      </SignedIn>
    </nav>
  );
};

export default Header;
