import Groups from "@/components/Groups";
import { getGroups } from "@/lib/actions/group.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const userInfo = await getLoggedInUser();
  if (!userInfo?.onboarded) redirect("/onboarding");

  const groups = await getGroups(userInfo.id);
  return <Groups groups={groups} />;
};

export default page;
