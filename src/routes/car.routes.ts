import express from "express";
import { getCars, getCar, createCar } from "../controllers/car.controller";
import { upload } from "../middleware/uploadCloud";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", upload.single("imageCars"), createCar);
export default router;
