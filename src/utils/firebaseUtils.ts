import {
  collection,
  CollectionReference,
  type DocumentData,
} from "firebase/firestore";
import { DB } from "@/services/api/firebaseConfig";

const getCollectionRef = <T = DocumentData>(
  collectionName: string
): CollectionReference<T> => {
  return collection(DB, collectionName) as CollectionReference<T>;
};

const getAuthMessage = (code: string) => {
  let message = "";

  if (code.includes("missing-password")) {
    message = "Missing passsword, Please try again";
  } else if (code.includes("invalid-credential")) {
    message = "Invalid credentials";
  } else {
    message = "Problem occur please try again";
  }
  return message;
};
export { getCollectionRef, getAuthMessage };
