import PostList from "@/components/PostList";
import PublicProfile from "@/components/PublicProfile";
import { getPosts } from "@/lib/actions/post.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);
  if (!user) return <p className="text-gray-1">User not found</p>;
  const posts = await getPosts(params.id);

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  return (
    <div className="flex flex-col gap-5 main-content">
      <PublicProfile
        clerkId={clerkUser.id}
        user={user}
        postCount={posts?.length ?? 0}
      />

      <h1 className="text-heading3-bold mt-6">Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default page;
