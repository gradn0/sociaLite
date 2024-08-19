import PostList from "@/components/PostList";
import PublicProfile from "@/components/PublicProfile";
import { getPosts } from "@/lib/actions/post.actions";
import { getLoggedInUser, getUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);
  if (!user) return <p className="text-gray-1">User not found</p>;
  const posts = await getPosts(params.id);

  const userInfo = await getLoggedInUser();
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <div className="flex flex-col gap-5 main-content">
      <PublicProfile
        clerkId={userInfo.id}
        user={user}
        postCount={posts?.length ?? 0}
      />

      <h1 className="text-heading3-bold mt-6">Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default page;
