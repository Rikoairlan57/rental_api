import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import { UploadApiOptions } from "cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (): Promise<UploadApiOptions> => ({
    folder: "rentalcars",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  }),
});

export const upload = multer({ storage });
