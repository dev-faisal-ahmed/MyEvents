import { cloudinaryEnv } from "./config";

// cloudinary-upload.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = cloudinaryEnv.cloudName;
  const uploadPreset = cloudinaryEnv.presetName;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const res = await fetch(url, { method: "POST", body: formData });

  if (!res.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await res.json();
  return data.secure_url;
};
