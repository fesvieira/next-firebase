import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../config";

export const signInWithGoogle = async () => {
  return signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      console.log(result);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
