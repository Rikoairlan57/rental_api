import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    nameCars: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    countSeat: { type: Number, required: true },
    imageCars: { type: String, required: true },
    platNumber: { type: String, required: true },
    color: { type: String, required: true },
    isRental: { type: Boolean, default: false },
    dateStart: { type: Date, default: null },
    dateEnd: { type: Date, default: null },
    rentalDuration: { type: Number, default: null },
  },
  { timestamps: true }
);

export const Car = mongoose.model("Car", carSchema);
