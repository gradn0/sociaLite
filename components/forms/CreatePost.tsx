"use client";
import { createPost } from "@/lib/actions/post.actions";
import { useUploadThing } from "@/lib/uploadthings";
import { postSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

const CreatePost = ({ userInfo }: { userInfo: User }) => {
  const { register, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof postSchema>
  >({
    resolver: zodResolver(postSchema),
    defaultValues: {
      text: "",
      authorId: userInfo.id,
    },
  });

  const pathname = usePathname();
  const params = useParams();
  const [file, setFile] = useState<File>();
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      const file = e.target.files[0];

      if (!file.type.includes("image")) return;

      reader.onload = (e) => {
        setValue("image", e.target?.result as string);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof postSchema>> = async (
    values
  ) => {
    const newImageSelected =
      values.image &&
      /^data:image\/(png|jpe?g|gif|webp);base64,/.test(values.image);
    if (newImageSelected && file) {
      const res = await startUpload([file]);
      if (res && res[0].url) values.image = res[0].url;
    }

    await createPost({
      ...values,
      path: pathname,
      groupId: (params.id as string) ?? undefined,
    });
    setValue("text", "");
    setValue("image", undefined);
  };

  return (
    <form
      className="bg-light-1 rounded-lg py-2 px-7 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-6 border-b border-grey p-4 items-center">
        <Image
          src={userInfo.image}
          width={40}
          height={40}
          alt="your avatar"
          className="rounded-full object-cover size-[47px]"
        />
        <input
          {...register("text")}
          type="text"
          className="text-input w-full text-base-regular flex flex-col flex-wrap"
          placeholder="What's on your mind?"
        />
        {isUploading ? (
          <ClipLoader
            color="#80aaff"
            loading={isUploading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="p-2"
          />
        ) : (
          <IoMdSend
            size={25}
            className="cursor-pointer"
            onClick={handleSubmit(onSubmit)}
          />
        )}
      </div>

      {watch("image") && (
        <Image
          src={watch("image")!}
          width={147}
          height={147}
          alt="uploaded image"
          className="max-lg:mx-auto mt-4"
        />
      )}

      <div className="flex gap-8 p-4 justify-between">
        <label
          htmlFor="file-upload"
          className="flex gap-2 items-center cursor-pointer"
        >
          <Image
            src="/assets/photo.svg"
            width={17}
            height={17}
            alt={"upload photo"}
          />
          <p className="text-base-semibold max-sm:hidden">Photo</p>
        </label>

        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleImageChange}
        />

        <div className="flex gap-2 items-center">
          <Image
            src="/assets/video.svg"
            width={17}
            height={17}
            alt={"upload video"}
          />
          <p className="text-base-semibold max-sm:hidden">Video</p>
        </div>

        <div className="flex gap-2 items-center">
          <Image
            src="/assets/camera.svg"
            width={17}
            height={17}
            alt={"upload video"}
          />
          <p className="text-base-semibold max-sm:hidden">Go Live</p>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
