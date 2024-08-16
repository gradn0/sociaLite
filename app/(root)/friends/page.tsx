import Friends from "@/components/Friends";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const page = async () => {
  const user = await getLoggedInUser();

  if (!user) return;
  return <Friends user={user} />;
};

export default page;
