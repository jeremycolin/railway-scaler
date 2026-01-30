import { view, useView, type ViewRef } from "react-fate";
import type { Post } from "@app/api/src/trpc/app-router.ts";

export const PostView = view<Post>()({
  content: true,
  id: true,
  title: true,
});

export const PostCard = ({ post: postRef }: { post: ViewRef<"Post"> }) => {
  const post = useView(PostView, postRef);

  return (
    <div className="flex flex-col gap-2">
      <h2>{post.title ?? "Untitled"}</h2>
      <p>{post.content}</p>
    </div>
  );
};
