import express from "express";
import path from "path";
import connectDB from "./config/db";

const app = express();
const PORT = 3000;



connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
