import type { Timestamp } from "firebase/firestore";

export type TUser = {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  createdAt: Timestamp;
};
