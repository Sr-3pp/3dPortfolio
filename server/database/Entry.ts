import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const blog = sqliteTable("blog", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  banner: text("banner").notNull(),
  createdAt: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
