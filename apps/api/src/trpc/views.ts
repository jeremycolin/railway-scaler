import { dataView, list, type Entity } from "@nkzw/fate/server";

export const postDataView = dataView<{
  id: string;
  title: string;
  content: string;
}>("Post")({
  id: true,
  title: true,
  content: true,
});

export type Post = Entity<typeof postDataView, "Post">;

export const projectDataView = dataView<{
  id: string;
  name: string;
}>("Project")({
  id: true,
  name: true,
});

export type Project = Entity<typeof projectDataView, "Project">;

export const Root = {
  posts: list(postDataView),
  project: projectDataView,
};
