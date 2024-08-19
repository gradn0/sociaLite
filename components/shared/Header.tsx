import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import { RiLogoutCircleLine } from "react-icons/ri";
import Searchbar from "../forms/Searchbar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Header = async () => {
  const userInfo = await getLoggedInUser();
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
      <SignedIn>
        <span className="max-lg:hidden">
          <Searchbar />
        </span>
        <div className="flex items-center gap-5">
          {userInfo && (
            <Image
              src={userInfo?.image || "/assets/defaultProfile.svg"}
              alt="logo"
              width={28}
              height={28}
              className="rounded-full size-[35px] object-cover"
            />
          )}
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
