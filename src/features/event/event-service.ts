import type { TEventSchema } from "./event-schema";
import { safePromise } from "@/lib/utils";
import { getUserIdOrThrow } from "../global/global-service";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-config";
import { dbNames } from "@/lib/firebase/db-names";
import { Response } from "@/lib/response";
import { uploadToCloudinary } from "@/lib/cloudinary";

const createEvent = async (input: TEventSchema) => {
  const userId = getUserIdOrThrow();

  if (input.coverImage instanceof File) {
    const uploadImagePromise = uploadToCloudinary(input.coverImage);
    const [error, result] = await safePromise(uploadImagePromise);
    if (error) throw error;
    input.coverImage = result;
  }

  const eventsRef = collection(db, dbNames.events);
  const eventDocRef = doc(eventsRef);

  const eventData = {
    ...input,
    createdBy: userId,
    createdAt: serverTimestamp(),
  };

  const setDocPromise = setDoc(eventDocRef, eventData);
  const [error] = await safePromise(setDocPromise);
  if (error) throw error;

  return Response.success("Event created successfully", { id: eventDocRef.id });
};

export { createEvent };
