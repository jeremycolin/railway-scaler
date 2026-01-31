import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://backboard.railway.com/graphql/v2",
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/codegen/": {
      preset: "client",
      config: {
        documentMode: "string",
        useTypeImports: true,
        enumsAsConst: true,
      },
    },
    "./src/graphql/codegen/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
  importExtension: ".ts",
  watch: true,
};

export default config;
