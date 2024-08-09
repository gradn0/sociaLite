import UserList from "@/components/UserList";
import { getLoggedInUser, getUser } from "@/lib/actions/user.actions";

const page = async () => {
  const user = await getLoggedInUser();
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
