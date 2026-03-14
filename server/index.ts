import express from "express";
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";
import { db } from "./db";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

const app = express();

/* CORS FIX */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "airbuddy-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/* REGISTER */
app.post("/api/register", async (req, res) => {
  const { email, password, name } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      email,
      password: hashed,
      name,
      companyId: "ab-001",
    })
    .returning();

  req.session.userId = user.id;

  res.json(user);
});

/* LOGIN */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.userId = user.id;

  res.json(user);
});

/* CURRENT USER */
app.get("/api/user", async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json(null);
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, req.session.userId),
  });

  res.json(user);
});

/* LOGOUT */
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.listen(5000, () => {
  console.log("🚀 AirBuddy Ops Backend running on port 5000");
});



// =======================
// TEMP DATA APIs
// =======================

// Tasks
app.get("/api/tasks", (req, res) => {
  res.json([]);
});

// Attendance
app.get("/api/attendance/status", (req, res) => {
  res.json({
    checkedIn: false,
  });
});



app.listen(5000, () => {
  console.log("🚀 AirBuddy Ops Backend is running on port 5000");
});