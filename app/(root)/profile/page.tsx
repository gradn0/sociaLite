import Profile from "@/components/forms/Profile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/");

  const userInfo = await getUser(clerkUser.id);
  if (!userInfo) return;

  return (
    <section className="main-content">
      <h1 className="text-heading3-bold">Edit Profile</h1>
      <Profile userInfo={userInfo} />
    </section>
  );
};

export default page;
