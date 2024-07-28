import PostList from "@/components/PostList";
import { sampleFriends } from "@/constants";
import Image from "next/image";
import React from "react";

const page = () => {
  const user = sampleFriends[0];
  return (
    <div className="flex flex-col gap-5 main-content">
      <div className="flex flex-col items-center gap-4 bg-light-1 rounded-lg p-7 shadow-sm">
        <Image
          src="https://fer-uig.glitch.me?uuid=10"
          width={90}
          height={90}
          alt={user.name}
          className="rounded-full border-[4px] border-primary-500-light"
        />
        <h1 className="text-heading3-bold">{user.name}</h1>
        <p className="text-center text-dark-4 max-w-[50ch]">{user.bio}</p>

        <div className="flex gap-5 my-7">
          <div className="flex flex-col items-center px-2">
            <h2 className="text-body-bold">{user.friends}</h2>
            <p className="text-gray-1 text-base-regular">Friends</p>
          </div>
          <span className="border-r-[1px] border-gray-1"></span>
          <div className="flex flex-col items-center px-2">
            <h2 className="text-body-bold">{user.posts}</h2>
            <p className="text-gray-1 text-base-regular">Posts</p>
          </div>
        </div>

        <button className="bg-primary-500 text-light-1 w-full py-1.5 rounded-lg max-w-[300px]">
          Send Friend Request
        </button>
      </div>

      <h1 className="text-heading3-bold mt-6">Posts</h1>
      <PostList />
    </div>
  );
};

export default page;
