import firebaseApp from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Constants as C } from "@/constants/Constants";

const db = getFirestore(firebaseApp);

export default async function getDocument(collection: string, id: string) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
