import Activity from "@/components/Activity";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const userInfo = await getLoggedInUser();
  if (!userInfo?.onboarded) redirect("/onboarding");

  return <Activity user={userInfo} />;
};

export default page;
