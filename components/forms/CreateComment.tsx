"use client";
import { createPost } from "@/lib/actions/post.actions";
import { commentSchema, postSchema } from "@/lib/validations/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const CreateComment = ({
  userInfo,
  parentId,
}: {
  userInfo: User;
  parentId: string;
}) => {
  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof commentSchema>
  >({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      authorId: userInfo.id,
      text: "",
      parentId: parentId,
    },
  });

  const pathname = usePathname();

  const onSubmit: SubmitHandler<z.infer<typeof commentSchema>> = async (
    values
  ) => {
    await createPost({ ...values, path: pathname, parentId });
    setValue("text", "");
  };

  return (
    <form
      className="bg-light-1 rounded-lg py-2 px-7 shadow-sm flex gap-6 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        src={userInfo.image}
        width={30}
        height={30}
        alt="your avatar"
        className="rounded-full size-[35px] object-cover"
      />
      <input
        {...register("text")}
        type="text"
        className="text-input w-full"
        placeholder="Leave a comment..."
      />
    </form>
  );
};

export default CreateComment;
