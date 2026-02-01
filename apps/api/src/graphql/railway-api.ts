import type { ExecutionResult } from "graphql";
import type { TypedDocumentString } from "./codegen/graphql.ts";

const railwayApiUrl = process.env["RAILWAY_API_URL"]!;
if (!railwayApiUrl) {
  throw new Error("RAILWAY_API_URL is not set");
}

export function createRailwayApi(token: string) {
  return async function executeRailwayApi<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ) {
    const response = await fetch(railwayApiUrl, {
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
