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

export const environmentDataView = dataView<{
  id: string;
  name: string;
}>("Environment")({
  id: true,
  name: true,
});

export type Environment = Entity<typeof environmentDataView, "Environment">;

export const projectDataView = dataView<
  | {
      id: string;
      name: string;
      environments: Array<Environment>;
    }
  | { error: "MissingProjectAccessToken" | "ProjectNotFound"; message: string }
>("Project")({
  id: true,
  name: true,
  environments: list(environmentDataView),
  error: true,
  message: true,
});

export type Project = Entity<
  typeof projectDataView,
  "Project",
  {
    environments: Array<Environment>;
  }
>;

export const Root = {
  posts: list(postDataView),
  project: projectDataView,
};
