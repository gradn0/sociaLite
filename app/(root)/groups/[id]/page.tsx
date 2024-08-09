import Group from "@/components/Group";
import { getGroup } from "@/lib/actions/group.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const page = async ({ params }: { params: { id: string } }) => {
  const group = await getGroup(params.id);
  const user = await getLoggedInUser();
  return (
    <Group
      group={group}
      user={user}
    />
  );
};

export default page;
