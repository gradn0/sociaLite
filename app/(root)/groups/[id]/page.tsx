import Group from "@/components/Group";
import { getGroup } from "@/lib/actions/group.actions";

const page = async ({ params }: { params: { id: string } }) => {
  const group = await getGroup(params.id);
  return <Group group={group} />;
};

export default page;
