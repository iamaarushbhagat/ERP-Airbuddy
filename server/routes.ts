import type { Express, NextFunction } from "express";
import { createServer, type Server } from "http";
import { db } from "./db"; 
import { attendance, tasks, meetings, users } from "../shared/schema";
import { eq, desc } from "drizzle-orm";

export function registerRoutes(app: Express): Server {

  // ==========================================
  // DEVELOPMENT MASTER KEY (Inside the function!)
  // ==========================================
  app.use((req: any, res: any, next: NextFunction) => {
    req.isAuthenticated = () => true;
    req.user = { id: 1, username: "admin" };
    next();
  });

  app.get("/api/user", (req: any, res) => res.json({ id: 1, username: "admin" }));
  app.post("/api/login", (req: any, res) => res.json({ id: 1, username: "admin" }));
  app.post("/api/logout", (req, res) => res.json({ success: true }));

  // ==========================================
  // ATTENDANCE HUB ROUTES
  // ==========================================
  app.get("/api/attendance/status", async (req: any, res) => {
    const latestStatus = await db.query.attendance.findFirst({
      where: eq(attendance.userId, req.user!.id),
      orderBy: [desc(attendance.checkInTime)],
    });
    const isCheckedIn = !!latestStatus && !latestStatus.checkOutTime;
    res.json({ isCheckedIn });
  });

  app.post("/api/attendance/check-in", async (req: any, res) => {
    const newRecord = await db.insert(attendance).values({
      userId: req.user!.id,
      checkInTime: new Date(),
      date: new Date(),
      method: "Wifi",
    }).returning();
    res.json(newRecord[0]);
  });

  // ==========================================
  // MEETINGS & NOTES ROUTES
  // ==========================================
  app.get("/api/meetings", async (req: any, res) => {
    const userMeetings = await db.query.meetings.findMany({
      where: eq(meetings.userId, req.user!.id),
      orderBy: [desc(meetings.id)], 
    });
    res.json(userMeetings);
  });

  app.post("/api/meetings", async (req: any, res) => {
    const newMeeting = await db.insert(meetings).values({
      ...req.body,
      userId: req.user!.id,
    }).returning();
    res.json(newMeeting[0]);
  });

  const httpServer = createServer(app);
  return httpServer;
}