import firebaseApp from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Constants as C } from "@/constants/Constants";

const db = getFirestore(firebaseApp);

export default async function getPublicWords() {
  let docRef = doc(
    db,
    C.Database.Public.collection,
    C.Database.Public.document
  );

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    console.log(e);

    error = e;
  }

  return { result, error };
}
