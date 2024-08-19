import Search from "@/components/Search";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const userInfo = await getLoggedInUser();
  if (!userInfo?.onboarded) redirect("/onboarding");
  return <Search />;
};

export default page;
