import type { TEvent } from "./event-type";
import type { TEventSchema } from "./event-schema";
import { safePromise } from "@/lib/utils";
import { getUserIdOrThrow } from "../global/global-service";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-config";
import { dbNames } from "@/lib/firebase/db-names";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Response } from "@/lib/response";
import { format } from "date-fns";

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

// const getUpcomingEvents = async () => {
//   const dbQuery = query(collection(db, dbNames.events), where("startDate", ">=", serverTimestamp()));
// };

const getEvents = async () => {
  const userId = getUserIdOrThrow();
  const dbQuery = query(collection(db, dbNames.events), where("createdBy", "==", userId));
  const snapshot = await getDocs(dbQuery);
  const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TEvent[];

  console.log("Called at", format(new Date(), "yyyy-MM-dd HH:mm:ss"));

  return Response.success("Events fetched successfully", events);
};

const getEventById = async (id: string) => {
  const docRef = doc(db, dbNames.events, id);
  const snapshot = await getDoc(docRef);
  const eventData = { id: snapshot.id, ...snapshot.data() } as TEvent;
  return Response.success("Event fetched successfully", eventData);
};

export { createEvent, getEvents, getEventById };
