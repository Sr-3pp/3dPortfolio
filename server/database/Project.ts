import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull(),
  banner: text("banner").notNull(),
  createdAt: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
