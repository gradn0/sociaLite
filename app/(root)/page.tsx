import CreatePost from "@/components/CreatePost";
import PostList from "@/components/PostList";

const page = () => {
  return (
    <div className="main-content">
      <h1 className="text-heading3-bold">My Feed</h1>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default page;
