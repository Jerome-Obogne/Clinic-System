import { DB } from "@/services/api/firebaseConfig"
import { collection, CollectionReference, type DocumentData } from "firebase/firestore"


const getCollectionRef = <T = DocumentData>(collectionName: string): CollectionReference<T> => {
  return collection(DB, collectionName) as CollectionReference<T>;
};
export { getCollectionRef };