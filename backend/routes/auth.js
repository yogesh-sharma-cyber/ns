import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUser } from "../models/userModel.js";

const router = express.Router();
const SECRET = "mysecret"; // Replace with env var

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await findUser(username);
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
