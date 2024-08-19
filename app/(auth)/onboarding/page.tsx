import Profile from "@/components/forms/Profile";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const dbUser = await getUser(clerkUser.id);

  const userInfo = {
    id: clerkUser.id,
    objectId: dbUser?.id || "",
    username: dbUser?.username || clerkUser.username || "",
    name:
      dbUser?.name ||
      (clerkUser.firstName &&
        clerkUser?.firstName + " " + clerkUser?.lastName) ||
      "",
    bio: dbUser?.bio || "",
    image: dbUser?.image || clerkUser.imageUrl,
  };

  return (
    <main className="px-10 py-20 mx-auto max-w-3xl flex flex-col gap-10">
      <h1 className="text-heading3-bold">Let's get your account set up</h1>
      <Profile userInfo={userInfo} />
    </main>
  );
};

export default page;
