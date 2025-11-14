import type { TEvent } from "./event-type";
import type { TEventSchema } from "./event-schema";
import { chuckArray, safePromise } from "@/lib/utils";
import { getUserOrThrow } from "../global/global-service";
import { collection, deleteDoc, doc, documentId, getDoc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-config";
import { dbNames } from "@/lib/firebase/db-names";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Response } from "@/lib/response";
import type { TFavorite } from "../favorite/favorite-type";

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

const getFavoritedEvents = async () => {
  const user = getUserOrThrow();
  const dbQuery = query(collection(db, dbNames.favorites), where("userId", "==", user.uid));
  const snapshot = await getDocs(dbQuery);
  const favoriteList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TFavorite[];
  const favoriteEventIds = favoriteList.map((favorite) => favorite.eventId) as string[];

  const groups = chuckArray(favoriteEventIds, 10);

  const queries = groups.map((group) => getDocs(query(collection(db, dbNames.events), where(documentId(), "in", group))));
  const results = await Promise.all(queries);
  const events = results.flatMap((snap) => snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  return events as TEvent[];
};

const getEventById = async (id: string) => {
  const docRef = doc(db, dbNames.events, id);
  const snapshot = await getDoc(docRef);
  const eventData = { id: snapshot.id, ...snapshot.data() } as TEvent;
  return Response.success("Event fetched successfully", eventData);
};

type TUpdateEventInput = {
  id: string;
  input: Partial<TEventSchema>;
};

const updateEvent = async ({ id, input }: TUpdateEventInput) => {
  const user = getUserOrThrow();
  const eventRef = doc(db, dbNames.events, id);
  const eventSnapshot = await getDoc(eventRef);

  if (!eventSnapshot.exists()) throw new Error("Event not found");

  const existingEvent = eventSnapshot.data() as TEvent;
  if (existingEvent.createdBy.id !== user.uid) throw new Error("You are not authorized to update this event");

  if (input.coverImage instanceof File) {
    const imageUploadPromise = uploadToCloudinary(input.coverImage);
    const [error, result] = await safePromise(imageUploadPromise);
    if (error) throw error;
    input.coverImage = result;
  }

  const updateData: Partial<TEvent> = {
    ...input,
    startDate: input.startDate ? Timestamp.fromDate(input.startDate) : existingEvent.startDate,
    endDate: input.endDate ? Timestamp.fromDate(input.endDate) : existingEvent.endDate,
    coverImage: input.coverImage ?? existingEvent.coverImage,
  };

  const [updateError] = await safePromise(setDoc(eventRef, updateData, { merge: true }));
  if (updateError) throw updateError;

  return Response.success("Event updated successfully", { id });
};

const deleteEvent = async (id: string) => {
  const user = getUserOrThrow();

  const eventRef = doc(db, dbNames.events, id);
  const eventSnapshot = await getDoc(eventRef);

  if (!eventSnapshot.exists()) throw new Error("Event not found");

  const existingEvent = eventSnapshot.data() as TEvent;
  if (existingEvent.createdBy.id !== user.uid) throw new Error("You are not authorized to delete this event");

  const [deleteError] = await safePromise(deleteDoc(eventRef));
  if (deleteError) throw deleteError;

  return Response.success("Event deleted successfully", { id });
};

export { createEvent, getUpComingEvents, getFavoritedEvents, getEventById, updateEvent, deleteEvent };
