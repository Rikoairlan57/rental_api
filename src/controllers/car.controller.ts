import { Request, Response } from "express";
import { Car } from "../models/car.model";

export const getCars = async (_: Request, res: Response): Promise<void> => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars", error });
  }
};

export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch car", error });
  }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nameCars, pricePerDay, countSeat, isRental, dateStart, dateEnd } =
      req.body;
    const rental = isRental === "true" || isRental === true;
    const imagePath = req.file?.path;

    if (rental && (!dateStart || !dateEnd)) {
      res.status(400).json({ message: "dateStart dan dateEnd wajib" });
      return;
    }

    if (rental && new Date(dateEnd) <= new Date(dateStart)) {
      res
        .status(400)
        .json({ message: "dateEnd harus lebih besar dari dateStart" });
      return;
    }

    const rentalDuration = rental
      ? Math.ceil(
          (new Date(dateEnd).getTime() - new Date(dateStart).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    const newCar = new Car({
      nameCars,
      pricePerDay,
      countSeat,
      imageCars: imagePath,
      isRental: rental,
      dateStart: rental ? new Date(dateStart) : null,
      dateEnd: rental ? new Date(dateEnd) : null,
      rentalDuration,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error: any) {
    console.error("❌ CREATE ERROR:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
};
