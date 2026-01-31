import type { ExecutionResult } from "graphql";
import type { TypedDocumentString } from "./codegen/graphql.ts";

const RAILWAY_API_URL = "https://backboard.railway.com/graphql/v2";

export function createRailwayApi(token: string) {
  return async function executeRailwayApi<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ) {
    const response = await fetch(RAILWAY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json",
        "Project-Access-Token": token,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json() as ExecutionResult<TResult>;
  };
}
