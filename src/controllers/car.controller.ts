import { Request, Response } from "express";
import { Car } from "../models/car.model";

export const getCars = async (_: Request, res: Response) => {
  const cars = await Car.find();
  res.json(cars);
};

export const getCar = async (req: Request, res: Response) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: "Not found" });
  res.json(car);
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      nameCars,
      pricePerDay,
      countSeat,
      isRental,
      imageCars,
      dateStart,
      dateEnd,
    } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : imageCars;
    const rental = isRental === "true" || isRental === true;

    if (rental && (!dateStart || !dateEnd)) {
      res
        .status(400)
        .json({ message: "dateStart dan dateEnd wajib jika mobil disewa" });
      return;
    }

    if (rental && new Date(dateEnd) <= new Date(dateStart)) {
      res
        .status(400)
        .json({ message: "dateEnd harus lebih besar dari dateStart" });
      return;
    }

    let rentalDuration = 0;
    if (rental) {
      rentalDuration = Math.ceil(
        (new Date(dateEnd).getTime() - new Date(dateStart).getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }

    const newCar = new Car({
      nameCars,
      pricePerDay,
      countSeat,
      imageCars: imagePath,
      isRental: rental,
      dateStart: rental ? new Date(dateStart) : null,
      dateEnd: rental ? new Date(dateEnd) : null,
      rentalDuration: rental ? rentalDuration : null,
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
