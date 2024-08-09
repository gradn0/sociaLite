import UserList from "@/components/UserList";
import { getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) return;
  const user = await getUser(clerkUser.id);
  if (!user) return;
  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">Friends</h1>
      {user.friends.length > 0 ? (
        <UserList users={user.friends} />
      ) : (
        <p className="text-gray-1">You don't have any friends yet</p>
      )}
    </div>
  );
};

export default page;
