import CreateComment from "@/components/forms/CreateComment";
import PostCard from "@/components/PostCard";
import Comment from "@/components/ui/Comment";
import { getPost } from "@/lib/actions/post.actions";
import { getUser } from "@/lib/actions/user.actions";
import { PostWithLikesAuthors } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const page = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  const userInfo = await getUser(clerkUser.id);

  if (!post) return <p className="text-gray-1 mx-auto">Post not found</p>;
  if (!userInfo) return null;

  return (
    <section className="main-content">
      <PostCard post={post} />
      <CreateComment
        userInfo={userInfo}
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
