import express from "express";
import { initDB } from "../db.js";
import { createUser } from "../models/userModel.js";
import { createServerTable } from "../models/serverModel.js";

const router = express.Router();
let setupDone = false;

router.post("/", async (req, res) => {
  if (setupDone) return res.status(400).json({ message: "Setup already done" });

  const { dbHost, dbPort, dbName, dbUser, dbPassword, adminUsername, adminPassword } = req.body;

  try {
    initDB({
      host: dbHost,
      port: dbPort,
      database: dbName,
      user: dbUser,
      password: dbPassword
    });

    await createUser(adminUsername, adminPassword);
    await createServerTable();  // 🔥 create servers table during setup

    setupDone = true;
    res.json({ message: "Setup completed" });
  } catch (err) {
    console.error("Setup error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
