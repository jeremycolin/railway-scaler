import { PostCard, PostView } from "./post-view.tsx";
import { useListView, type ConnectionRef } from "react-fate";

// eslint-disable-next-line react-refresh/only-export-components
export const PostConnectionView = {
  args: { first: 3 },
  items: {
    node: PostView,
  },
};

export function PostsListView({
  posts: postsRef,
}: {
  posts: ConnectionRef<"Post">;
}) {
  const [posts] = useListView(PostConnectionView, postsRef);
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.node.id} post={post.node} />
      ))}
    </div>
  );
}
