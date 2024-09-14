import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "server/database/index.ts",
  out: "server/database/migrations",
});
