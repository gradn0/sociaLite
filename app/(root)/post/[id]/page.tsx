import CreateComment from "@/components/forms/CreateComment";
import PostCard from "@/components/PostCard";
import Comment from "@/components/Comment";
import { getPost } from "@/lib/actions/post.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export const page = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const user = await getLoggedInUser();

  if (!post) return <p className="text-gray-1 mx-auto">Post not found</p>;
  if (!user) return null;

  return (
    <section className="main-content">
      <PostCard post={post} />
      <CreateComment
        userInfo={user}
        parentId={params.id}
      />

      {post.children.map((comment: any) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </section>
  );
};

export default page;
