import type { TFavorite } from "./favorite-type";
import { dbNames } from "@/lib/firebase/db-names";
import { getUserOrThrow } from "../global/global-service";
import { db } from "@/lib/firebase/firebase-config";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { Response } from "@/lib/response";

const toggleFavorite = async (id: string) => {
  const user = getUserOrThrow();
  const docId = `${user.uid}-${id}`;
  const favoriteRef = doc(db, dbNames.favorites, docId);
  const snapshot = await getDoc(favoriteRef);
  if (snapshot.exists()) {
    await deleteDoc(favoriteRef);
    return Response.success("Event removed from favorite list", { id });
  }
  const favoriteData: Omit<TFavorite, "id"> = {
    userId: user.uid,
    eventId: id,
  };
  await setDoc(favoriteRef, favoriteData);
};

const getFavoriteMap = async () => {
  const user = getUserOrThrow();
  const dbQuery = query(collection(db, dbNames.favorites), where("userId", "==", user.uid));
  const snapshot = await getDocs(dbQuery);

  const favoriteList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TFavorite[];

  const favoriteMap: Record<string, boolean> = {};
  favoriteList.forEach((favorite) => {
    favoriteMap[favorite.eventId] = true;
  });

  return Response.success("Favorite list fetched successfully", favoriteMap);
};

export { toggleFavorite, getFavoriteMap };
