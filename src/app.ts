import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db";
import carRoutes from "./routes/car.routes";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("uploads", express.static(path.join(__dirname, "../uploads")));

connectDB();
app.use("/api/cars", carRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
