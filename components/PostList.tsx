import { PostWithAuthor } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

const PostList = ({ posts }: { posts: PostWithAuthor[] | undefined }) => {
  if (!posts || posts.length < 1)
    return <p className="text-gray-1 mx-auto">No Posts</p>;

  return (
    <ul className="flex flex-col gap-5">
      {posts &&
        posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm"
          >
            <div className="flex gap-6 items-center">
              <Link href={`profile/${post.author.id}`}>
                <Image
                  src={post.author.image}
                  width={30}
                  height={30}
                  alt="your avatar"
                  className="rounded-full size-[35px]"
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  href={`profile/${post.author.id}`}
                  className="text-base-semibold"
                >
                  {post.author.username}
                </Link>
                <p className="text-subtle-medium">
                  {post.createdAt.toDateString()}
                </p>
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
