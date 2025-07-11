import express from "express";
import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/car.controller";
import { upload } from "../middleware/uploadCloud";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", upload.single("imageCars"), createCar);
router.put("/:id", upload.single("imageCars"), updateCar);
router.delete("/:id", deleteCar);

export default router;
