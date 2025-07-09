import express from "express";
import { getCars, getCar, createCar } from "../controllers/car.controller";
import { upload } from "../middleware/uploads";

const router = express.Router();

router.get("/", getCars);

export default router;
