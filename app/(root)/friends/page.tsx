import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return;
  const user = await getUser(clerkUser.id);
  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Friends</h1>
      <ul className="flex flex-col gap-3">
        {user?.friends.map((friend) => (
          <Link
            href={`/profile/${friend.id}`}
            className="flex items-center bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm"
          >
            <Image
              src={friend.image}
              width={30}
              height={30}
              alt={friend.username}
              className="rounded-full size-[35px]"
            />
            <div className="flex flex-col">
              <h2 className="text-base-semibold">{friend.username}</h2>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default page;
