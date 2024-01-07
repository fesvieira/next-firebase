import firebaseApp from "../config";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const auth = getAuth(firebaseApp);

export default async function signIn(email: string, password: string) {
  let result = null;
  let error = null;
  
  try {
    setPersistence(auth, browserLocalPersistence);
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
