import CreatePost from "@/components/CreatePost";
import PostList from "@/components/PostList";

const Home = () => {
  return (
    <div className="flex flex-col gap-5">
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
