import Groups from "@/components/Groups";
import { getGroups } from "@/lib/actions/group.actions";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return;
  const groups = await getGroups(clerkUser.id);
  return <Groups groups={groups} />;
};

export default page;
