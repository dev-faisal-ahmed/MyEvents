// main services

import type { TCategory } from "./category-type";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase-config";
import { dbNames } from "@/lib/firebase/db-names";
import { safePromise } from "@/lib/utils";
import { Response } from "@/lib/response";

const categoryDBRef = collection(db, dbNames.categories);

type TCreateCategoryInput = Pick<TCategory, "name" | "createdBy" | "description">;

const createCategory = async (category: TCreateCategoryInput) => {
  const [error, result] = await safePromise(addDoc(categoryDBRef, category));
  if (error) throw error;
  return Response.success("Category created successfully", result.id);
};

// exports
export { createCategory };
