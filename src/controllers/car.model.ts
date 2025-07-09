import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    nameCars: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    countSeat: { type: Number, required: true },
    imageCars: { type: String, required: true },
    isRental: { type: Boolean, required: true },
    dateStart: { type: Date },
    dateEnd: { type: Date },
  },
  { timestamps: true }
);

export const Car = mongoose.model("Car", CarSchema);
