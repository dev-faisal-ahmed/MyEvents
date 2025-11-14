import { auth } from "@/lib/firebase/firebase-config";

const getUserOrThrow = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");
  return user;
};

export { getUserOrThrow };
