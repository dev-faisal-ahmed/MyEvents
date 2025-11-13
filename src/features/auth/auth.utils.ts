import { safePromise } from "@/lib/utils";
import { auth, googleAuthProvider } from "@/lib/firebase/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";

export const signInWithGoogle = async () => {
  const [error, result] = await safePromise(signInWithPopup(auth, googleAuthProvider));

  if (error) {
    console.log("Signin error", error);
    throw error;
  }

  return result.user;
};

export const signOutUser = async () => {
  const [error] = await safePromise(signOut(auth));

  if (error) {
    console.log("Signout error", error);
    throw error;
  }
};
