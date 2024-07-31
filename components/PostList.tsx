"use client";
import React from "react";
import PostCard from "./PostCard";
import { PostWithLikesAuthors } from "@/lib/prisma";

const PostList = ({ posts }: { posts: PostWithLikesAuthors[] | undefined }) => {
  if (!posts || posts.length < 1)
    return <p className="text-gray-1 mx-auto">No Posts</p>;

  return (
    <ul className="flex flex-col gap-5">
      {posts &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
    </ul>
  );
};

export default PostList;
