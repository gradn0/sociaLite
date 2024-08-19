import Friends from "@/components/Friends";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const userInfo = await getLoggedInUser();
  if (!userInfo?.onboarded) redirect("/onboarding");

  return <Friends user={userInfo} />;
};

export default page;
