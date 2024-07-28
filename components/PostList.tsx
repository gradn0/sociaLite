import { samplePosts } from "@/constants";
import Image from "next/image";
import React from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

const PostList = () => {
  return (
    <ul className="flex flex-col gap-5">
      {samplePosts.map((post) => (
        <div className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm">
          <div className="flex gap-6 items-center">
            <Image
              src="https://fer-uig.glitch.me?uuid=10"
              width={30}
              height={30}
              alt="your avatar"
              className="rounded-full size-[35px]"
            />
            <div className="flex flex-col">
              <h2 className="text-base-semibold">{post.username}</h2>
              <p className="text-subtle-medium">{post.createdAt}</p>
            </div>
            <IoEllipsisVertical className="ml-auto" />
          </div>

          <p className="max-w-[55ch] text-base-regular">{post.text}</p>

          <div className="flex gap-7 text-small-regular">
            <div className="flex items-center gap-1 cursor-pointer">
              <FaHeart color="#f00000" />
              <p>1.2k</p>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaCommentDots color="hsl(210,100%,47%)" />
              <p>200</p>
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default PostList;
