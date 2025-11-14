import type { TEvent } from "./event-type";
import type { TEventSchema } from "./event-schema";
import { safePromise } from "@/lib/utils";
import { getUserOrThrow } from "../global/global-service";
import { collection, doc, getDoc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-config";
import { dbNames } from "@/lib/firebase/db-names";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Response } from "@/lib/response";

const createEvent = async (input: TEventSchema) => {
  const user = getUserOrThrow();

  if (input.coverImage instanceof File) {
    const uploadImagePromise = uploadToCloudinary(input.coverImage);
    const [error, result] = await safePromise(uploadImagePromise);
    if (error) throw error;
    input.coverImage = result;
  }

  const eventsRef = collection(db, dbNames.events);
  const eventDocRef = doc(eventsRef);
  const createdBy: TEvent["createdBy"] = { id: user.uid, name: user.displayName ?? "", photoURL: user.photoURL ?? "" };

  const eventData: Omit<TEvent, "id"> = {
    ...input,
    coverImage: input.coverImage as string,
    startDate: Timestamp.fromDate(input.startDate),
    endDate: Timestamp.fromDate(input.endDate),
    createdBy,
    createdAt: Timestamp.now(),
  };

  const setDocPromise = setDoc(eventDocRef, eventData);
  const [error] = await safePromise(setDocPromise);
  if (error) throw error;

  return Response.success("Event created successfully", { id: eventDocRef.id });
};

const getUpComingEvents = async () => {
  const dbQuery = query(collection(db, dbNames.events), where("startDate", ">", Timestamp.now()));
  const snapshot = await getDocs(dbQuery);
  const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TEvent[];

  return Response.success("Events fetched successfully", events);
};

const getEvents = async () => {
  const dbQuery = query(collection(db, dbNames.events));
  const snapshot = await getDocs(dbQuery);
  const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TEvent[];

  return Response.success("Events fetched successfully", events);
};

const getEventById = async (id: string) => {
  const docRef = doc(db, dbNames.events, id);
  const snapshot = await getDoc(docRef);
  const eventData = { id: snapshot.id, ...snapshot.data() } as TEvent;
  return Response.success("Event fetched successfully", eventData);
};

export { createEvent, getUpComingEvents, getEvents, getEventById };
