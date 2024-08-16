import Activity from "@/components/Activity";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const page = async () => {
  const user = await getLoggedInUser();
  if (!user) return null;
  return <Activity user={user} />;
};

export default page;
