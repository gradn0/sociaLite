import { sampleActivity } from "@/constants";
import Image from "next/image";

const page = () => {
  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Activity</h1>
      <ul className="flex flex-col gap-3">
        {sampleActivity.map((activity) => (
          <div className="flex flex-col bg-light-1 rounded-lg py-4 px-7 gap-4 shadow-sm">
            <div className="flex gap-6 items-center">
              <Image
                src="https://fer-uig.glitch.me?uuid=10"
                width={30}
                height={30}
                alt="your avatar"
                className="rounded-full size-[35px]"
              />
              <p className="text-base-normal max-w-[20ch]">
                <span className="text-base-semibold">{activity.name} </span>
                {activity.action}
                <span className="text-base-semibold"> {activity.place} </span>
              </p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default page;
