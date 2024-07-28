import { sampleFriends } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Friends</h1>
      <ul className="flex flex-col gap-3">
        {sampleFriends.map((friend) => (
          <Link
            href={"/profile/1"}
            className="flex items-center bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm"
          >
            <Image
              src="https://fer-uig.glitch.me?uuid=10"
              width={30}
              height={30}
              alt="your avatar"
              className="rounded-full size-[35px]"
            />
            <div className="flex flex-col">
              <h2 className="text-base-semibold">{friend.name}</h2>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default page;
