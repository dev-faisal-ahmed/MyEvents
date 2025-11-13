import type { Timestamp } from "firebase/firestore";

export type TEvent = {
  id: string;
  title: string;
  description: string;
  startDate: Timestamp;
  endDate: Timestamp;
  category: string;
  coverImage: string;
  location: string;
  cratedBy: string;
  createdAt: Timestamp;
};
