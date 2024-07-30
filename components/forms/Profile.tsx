"use client";
import { upsertUser } from "@/lib/actions/user.actions";
import { useUploadThing } from "@/lib/uploadthings";
import { userSchema } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdDriveFolderUpload } from "react-icons/md";
import { z } from "zod";

interface Props {
  id: string;
  objectId?: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  onboarded?: boolean;
}

const Profile = ({ userInfo }: { userInfo: Props }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: userInfo.name ?? "",
      username: userInfo.username ?? "",
      bio: userInfo.bio ?? "",
      image: userInfo.image ?? "",
    },
  });

  const [file, setFile] = useState<File>();
  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = async (
    values
  ) => {
    const newImageSelected = /^data:image\/(png|jpe?g|gif|webp);base64,/.test(
      values.image
    );
    if (newImageSelected && file) {
      const res = await startUpload([file]);
      if (res && res[0].url) values.image = res[0].url;
    }
    await upsertUser({ ...values, id: userInfo.id, path: pathname });
    router.push("/");
  };

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

  return (
    <form
      className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center gap-7 my-5">
        {watch("image") ? (
          <Image
            src={watch("image")}
            width={87}
            height={87}
            alt="user avatar"
            className="rounded-full max-lg:mx-auto"
          />
        ) : (
          <Image
            src="/assets/defaultProfile.svg"
            width={87}
            height={87}
            alt="user avatar"
            className="rounded-full max-lg:mx-auto"
          />
        )}
        {errors.image && (
          <p className="text-red-800 text-small-medium">
            {errors.image.message}
          </p>
        )}

        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 bg-primary-500 px-2 py-1 rounded text-light-1 cursor-pointer"
        >
          <MdDriveFolderUpload
            size={25}
            color="white"
          />
          Change
        </label>

        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleImageChange}
        />
      </div>

      <label
        htmlFor="name"
        className="px-1"
      >
        Name
      </label>
      <input
        className="form-input"
        {...register("name")}
      />
      {errors.name && (
        <p className="text-red-800 text-small-medium">{errors.name.message}</p>
      )}

      <label
        htmlFor="username"
        className="px-1"
      >
        Username
      </label>
      <input
        className="form-input"
        {...register("username", { required: true })}
      />
      {errors.username && (
        <p className="text-red-800 text-small-medium">
          {errors.username.message}
        </p>
      )}

      <label
        htmlFor="bio"
        className="px-1"
      >
        Bio
      </label>
      <textarea
        className="form-input py-4"
        {...register("bio")}
      />
      {errors.bio && (
        <p className="text-red-800 text-small-medium">{errors.bio.message}</p>
      )}

      <button
        type="submit"
        className={`bg-primary-500 text-light-1 w-full py-1.5 rounded-lg max-w-[300px] mx-auto my-5 ${
          isUploading || isLoading ? "bg-primary-500-light" : "bg-primary-500"
        }`}
        disabled={isUploading || isLoading}
      >
        {isUploading || isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Profile;
