import express from "express";
import { addServer, getServers, deleteServer } from "../models/serverModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, ip } = req.body;
  try {
    await addServer(name, ip);
    res.json({ message: "Server added successfully" });
  } catch (err) {
    console.error("Error adding server:", err);   // log error
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const servers = await getServers();
    res.json(servers);
  } catch (err) {
    console.error("Error fetching servers:", err);  // log error
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteServer(id);
    res.json({ message: "Server deleted successfully" });
  } catch (err) {
    console.error("Error deleting server:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
