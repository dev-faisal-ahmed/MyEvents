import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase-config";
import { safePromise } from "./utils";

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
