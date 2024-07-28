import { createPostOptions } from "@/constants";
import Image from "next/image";
import React from "react";

const CreatePost = () => {
  return (
    <div className="bg-light-1 rounded-lg py-2 px-7">
      <div className="flex gap-6 border-b border-grey p-4">
        <Image
          src="https://fer-uig.glitch.me?uuid=10"
          width={40}
          height={40}
          alt="your avatar"
          className="rounded-full"
        />
        <input
          type="text"
          className="text-input"
          placeholder="What's on your mind?"
        />
      </div>

      <div className="flex gap-8 p-4 justify-between">
        {createPostOptions.map((option) => (
          <div className="flex gap-2 items-center cursor-pointer">
            <Image
              src={option.imgURL}
              width={20}
              height={20}
              alt={option.label}
            />
            <p className="text-base-medium max-sm:hidden">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatePost;
