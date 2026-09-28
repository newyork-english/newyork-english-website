import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const reservations = sqliteTable("reservations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code").notNull().unique(),
  slotId: text("slot_id").notNull(),
  track: text("track").notNull(),
  sessionId: text("session_id").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  parentName: text("parent_name").notNull(),
  phone: text("phone").notNull(),
  childName: text("child_name").notNull(),
  childAge: text("child_age").notNull(),
  childGender: text("child_gender"),
  childYear: text("child_year").notNull(),
  attendees: integer("attendees").notNull().default(1),
  status: text("status").notNull().default("confirmed"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
