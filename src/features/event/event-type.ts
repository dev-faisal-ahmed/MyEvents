import type { Timestamp } from "firebase/firestore";
import type { TUser } from "../auth/auth-type";

export type TEvent = {
  id: string;
  title: string;
  description: string;
  startDate: Timestamp;
  endDate: Timestamp;
  category: string;
  coverImage: string;
  location: string;
  createdBy: Pick<TUser, "id" | "name" | "photoURL">;
  createdAt: Timestamp;
};
