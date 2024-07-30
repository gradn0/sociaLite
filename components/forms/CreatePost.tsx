"use client";
import { createPostOptions } from "@/constants";
import { createPost } from "@/lib/actions/post.actions";
import { postSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const CreatePost = ({ userInfo }: { userInfo: User }) => {
  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof postSchema>
  >({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      authorId: userInfo.id,
    },
  });

  const pathname = usePathname();

  const onSubmit: SubmitHandler<z.infer<typeof postSchema>> = async (
    values
  ) => {
    await createPost({ ...values, path: pathname });
    setValue("text", "");
  };

  return (
    <form
      className="bg-light-1 rounded-lg py-2 px-7 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-6 border-b border-grey p-4">
        <Image
          src={userInfo.image}
          width={44}
          height={44}
          alt="your avatar"
          className="rounded-full"
        />
        <input
          {...register("text")}
          type="text"
          className="text-input w-full text-base-regular flex flex-col flex-wrap"
          placeholder="What's on your mind?"
        />
      </div>

      <div className="flex gap-8 p-4 justify-between">
        {createPostOptions.map((option) => (
          <div
            key={option.label}
            className="flex gap-2 items-center cursor-pointer"
          >
            <Image
              src={option.imgURL}
              width={17}
              height={17}
              alt={option.label}
            />
            <p className="text-base-semibold max-sm:hidden">{option.label}</p>
          </div>
        ))}
      </div>
    </form>
  );
};

export default CreatePost;
