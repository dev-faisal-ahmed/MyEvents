import { safePromise } from "@/lib/utils";
import { auth, db, googleAuthProvider } from "@/lib/firebase/firebase-config";
import { signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { dbNames } from "@/lib/firebase/db-names";
import { toast } from "sonner";

export const signInWithGoogle = async () => {
  const [error, result] = await safePromise(signInWithPopup(auth, googleAuthProvider));

  if (error) {
    toast.error(error.message ?? "Something went wrong");
    return;
  }

  await createUserIfNotExists(result.user);

  return result.user;
};

const createUserIfNotExists = async (user: User) => {
  const userRef = doc(db, dbNames.users, user.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return;

  const userData = {
    name: user.displayName ?? "Anonymous",
    email: user.email ?? "",
    photoURL: user.photoURL ?? "",
    createdAt: serverTimestamp(),
  };

  const saveDocPromise = setDoc(userRef, userData);
  const [error] = await safePromise(saveDocPromise);
  if (error) toast.error(error.message ?? "Something went wrong");
};

export const signOutUser = async () => {
  const [error] = await safePromise(signOut(auth));

  if (error) {
    console.log("Signout error", error);
    toast.error(error.message ?? "Something went wrong");
  }
};
