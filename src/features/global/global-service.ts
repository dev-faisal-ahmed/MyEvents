import { auth } from "@/lib/firebase/firebase-config";

const getUserIdOrThrow = () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");
  return user.uid;
};

export { getUserIdOrThrow };
