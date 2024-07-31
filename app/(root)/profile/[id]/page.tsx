import PostList from "@/components/PostList";
import { getPosts } from "@/lib/actions/post.actions";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);
  if (!user) return <p className="text-gray-1">User not found</p>;
  const posts = await getPosts(params.id);

  const clerkUser = await currentUser();
  const isOwnProfile = clerkUser?.id === params.id;

  return (
    <div className="flex flex-col gap-5 main-content">
      <div className="flex flex-col items-center gap-4 bg-light-1 rounded-lg p-7 shadow-sm">
        <Image
          src={user.image}
          width={90}
          height={90}
          alt={user.username}
          className="rounded-full border-[4px] border-primary-500-light"
        />
        <h1 className="text-heading3-bold">{user.username}</h1>
        <p className="text-center text-gray-1 max-w-[50ch]">{user.bio}</p>

        <div className="flex gap-5 my-7">
          <div className="flex flex-col items-center px-2">
            <h2 className="text-body-bold">1200</h2>
            <p className="text-gray-1 text-base-regular">Friends</p>
          </div>
          <span className="border-r-[1px] border-gray-1"></span>
          <div className="flex flex-col items-center px-2">
            <h2 className="text-body-bold">{posts?.length}</h2>
            <p className="text-gray-1 text-base-regular">Posts</p>
          </div>
        </div>

        {isOwnProfile ? (
          <Link
            href="/profile"
            className="w-full flex justify-center"
          >
            <button className="text-dark-1 bg-light-2 w-full py-1.5 rounded-lg max-w-[300px]">
              Edit Profile
            </button>
          </Link>
        ) : (
          <button className="bg-primary-500 text-light-1 w-full py-1.5 rounded-lg max-w-[300px]">
            Send Friend Request
          </button>
        )}
      </div>

      <h1 className="text-heading3-bold mt-6">Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default page;
