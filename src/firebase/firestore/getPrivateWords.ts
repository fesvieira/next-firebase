import firebaseApp from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Constants as C } from "@/constants/Constants";

const db = getFirestore(firebaseApp);

export default async function getPrivateWords(uid: string) {
  let docRef = doc(
    db,
    C.Database.Private,
    uid
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
