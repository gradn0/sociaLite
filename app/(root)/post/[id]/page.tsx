import CreateComment from "@/components/forms/CreateComment";
import PostCard from "@/components/PostCard";
import Comment from "@/components/Comment";
import { getPost } from "@/lib/actions/post.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const userInfo = await getLoggedInUser();
  if (!userInfo?.onboarded) redirect("/onboarding");

  if (!post) return <p className="text-gray-1 mx-auto">Post not found</p>;

  return (
    <section className="main-content">
      <PostCard post={post} />
      {userInfo && <CreateComment userInfo={userInfo} parentId={params.id} />}

      {post.children.map((comment: any) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default page;
