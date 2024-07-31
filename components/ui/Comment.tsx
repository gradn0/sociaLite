"use client";
import { likePost } from "@/lib/actions/post.actions";
import { PostWithLikesAuthors } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

const Comment = ({ comment }: { comment: PostWithLikesAuthors }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm">
      <div className="flex gap-6 items-center">
        <Image
          src={comment.author.image}
          width={30}
          height={30}
          alt="your avatar"
          className="rounded-full size-[35px]"
        />
        <div className="flex flex-col">
          <Link
            href={`/profile/${comment.authorId}`}
            className="text-base-semibold"
          >
            {comment.author.username}
          </Link>
          <p className="text-subtle-medium">
            {comment.createdAt.toDateString()}
          </p>
        </div>
        <IoEllipsisVertical className="ml-auto" />
      </div>

      <p className="max-w-[55ch] text-base-regular">{comment.text}</p>

      <div className="flex gap-7 text-small-regular">
        <div className="flex items-center gap-1 cursor-pointer">
          <FaHeart
            color="#f00000"
            onClick={async () => await likePost(comment.id, pathname)}
          />
          <p>{comment.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
