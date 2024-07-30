import CreatePost from "@/components/forms/CreatePost";
import PostList from "@/components/PostList";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const userInfo = await getUser(clerkUser.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Hello, {userInfo.username}</h1>
      <CreatePost userInfo={userInfo} />
      <PostList />
    </div>
  );
};

export default page;
