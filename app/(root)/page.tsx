import CreatePost from "@/components/forms/CreatePost";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/actions/post.actions";
import { getLoggedInUser, getUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const userInfo = await getLoggedInUser();

  if (!userInfo?.onboarded) redirect("/onboarding");

  const posts = await getPosts();

  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Hello, {userInfo.username}</h1>
      <CreatePost userInfo={userInfo} />
      <PostList posts={posts} />
    </div>
  );
};

export default page;
