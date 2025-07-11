import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import connectDB from "./config/db";
import carRoutes from "./routes/car.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();
const PORT = 3000;

app.use("/api/auth", authRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/cars", carRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
