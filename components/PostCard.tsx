"use client";
import { likePost } from "@/lib/actions/post.actions";
import { PostWithLikesAuthors } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

const PostCard = ({ post }: { post: PostWithLikesAuthors }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm">
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
            href={`/profile/${post.author.id}`}
            className="text-base-semibold"
          >
            {post.author.username}
          </Link>
          <p className="text-subtle-medium">{post.createdAt.toDateString()}</p>
        </div>
        <IoEllipsisVertical className="ml-auto" />
      </div>

      <p className="max-w-[55ch] text-base-regular">{post.text}</p>

      <div className="flex gap-7 text-small-regular">
        <div className="flex items-center gap-1 cursor-pointer">
          <FaHeart
            color="#f00000"
            onClick={async () => await likePost(post.id, pathname)}
          />
          <p>{post.likes.length}</p>
        </div>
        <Link
          href={`/post/${post.id}`}
          className="flex items-center gap-1 cursor-pointer"
        >
          <FaCommentDots color="hsl(210,100%,47%)" />
          <p>{post.children.length}</p>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
