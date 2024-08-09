import Profile from "@/components/forms/Profile";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
  const userInfo = await getLoggedInUser();
  if (!userInfo) return;

  return (
    <section className="main-content">
      <h1 className="text-heading3-bold">Edit Profile</h1>
      <Profile userInfo={userInfo} />
    </section>
  );
};

export default page;
