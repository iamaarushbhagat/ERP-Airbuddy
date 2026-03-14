import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ==========================================
// 1. USERS TABLE (AUTH + PROFILE)
// ==========================================

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  companyId: text("company_id").notNull().unique(),

  name: text("name").notNull(),
  role: text("role").notNull().default("engineer"),
  department: text("department"),

  bio: text("bio").default("Computer Science Student | Finance Enthusiast"),

  achievements: jsonb("achievements").$type<string[]>().default([
    "Secured 30L+ INR Sponsorship for ELIXIR 24",
    "Hack n Tech - Certificate of Appreciation (IIT Patna)",
    "Research Paper: India's Microfinance Organizations"
  ]),
});

// ==========================================
// 2. TASK MANAGEMENT
// ==========================================

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),
  description: text("description"),

  assigneeId: integer("assignee_id").references(() => users.id),

  department: text("department"),

  priority: text("priority").notNull(),

  deadline: timestamp("deadline"),

  status: text("status").notNull().default("Not Started"),
  stage: text("stage").notNull().default("Research"),

  dependencies: jsonb("dependencies").$type<number[]>(),
});

// ==========================================
// 3. ATTENDANCE
// ==========================================

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id).notNull(),

  checkInTime: timestamp("check_in_time").notNull(),
  checkOutTime: timestamp("check_out_time"),

  date: timestamp("date").notNull(),

  method: text("method").notNull(),
});

// ==========================================
// 4. EVENTS / CALENDAR
// ==========================================

export const events = pgTable("events", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),
  description: text("description"),

  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),

  type: text("type").notNull(),

  attendees: jsonb("attendees").$type<number[]>(),
});

// ==========================================
// 5. LEAVE MANAGEMENT
// ==========================================

export const leaves = pgTable("leaves", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id).notNull(),

  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),

  reason: text("reason").notNull(),

  status: text("status").notNull().default("pending"),
});

// ==========================================
// 6. HIRING PIPELINE
// ==========================================

export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull(),

  role: text("role").notNull(),

  stage: text("stage").notNull().default("Applied"),

  notes: text("notes"),
});

// ==========================================
// 7. PARTNERSHIPS / BUSINESS DEVELOPMENT
// ==========================================

export const partnerships = pgTable("partnerships", {
  id: serial("id").primaryKey(),

  company: text("company").notNull(),

  contactPerson: text("contact_person").notNull(),
  email: text("email"),

  type: text("type").notNull(),

  stage: text("stage").notNull().default("Lead"),

  followUpDate: timestamp("follow_up_date"),

  notes: text("notes"),
});

// ==========================================
// 8. MEETINGS
// ==========================================

export const meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  time: text("time").notNull(),

  type: text("type").notNull(),

  notes: text("notes").default(""),

  userId: integer("user_id").references(() => users.id).notNull(),
});

// ==========================================
// 9. ZOD INSERT SCHEMAS
// ==========================================

export const insertUserSchema = createInsertSchema(users).omit({ id: true });

export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true });

export const insertAttendanceSchema = createInsertSchema(attendance).omit({ id: true });

export const insertEventSchema = createInsertSchema(events).omit({ id: true });

export const insertLeaveSchema = createInsertSchema(leaves).omit({
  id: true,
  status: true,
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({ id: true });

export const insertPartnershipSchema = createInsertSchema(partnerships).omit({ id: true });

export const insertMeetingSchema = createInsertSchema(meetings).omit({ id: true });

// ==========================================
// 10. TYPES
// ==========================================

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Leave = typeof leaves.$inferSelect;
export type InsertLeave = z.infer<typeof insertLeaveSchema>;

export type Candidate = typeof candidates.$inferSelect;
export type InsertCandidate = z.infer<typeof insertCandidateSchema>;

export type Partnership = typeof partnerships.$inferSelect;
export type InsertPartnership = z.infer<typeof insertPartnershipSchema>;

export type Meeting = typeof meetings.$inferSelect;
export type InsertMeeting = z.infer<typeof insertMeetingSchema>;