import { Constants as C } from "@/constants/Constants";
import firebaseApp from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function addPrivateWord(
  newWord: string,
  words: string[],
  uid: string
) {
  let result = null;
  let error = null;

  try {
    words.push(newWord);
    result = await setDoc(
      doc(db, C.Database.Private, uid),
      { words: words },
      {
        merge: true,
      }
    );
  } catch (e) {
    console.log(e);

    error = e;
  }

  return { result, error };
}
