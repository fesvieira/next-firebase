import { Constants as C } from "@/constants/Constants";
import firebaseApp from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default async function addPublicWord(
  newWord: string,
  publicWords: string[]
) {
  let result = null;
  let error = null;

  try {
    publicWords.push(newWord);
    result = await setDoc(
      doc(db, C.Database.Public.collection, C.Database.Public.document),
      { words: publicWords },
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
