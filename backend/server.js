import express from "express";
import cors from "cors";
import setupRoutes from "./routes/setup.js";
import authRoutes from "./routes/auth.js";
import serverRoutes from "./routes/server.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/setup", setupRoutes);
app.use("/auth", authRoutes);
app.use("/servers", serverRoutes);


app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
