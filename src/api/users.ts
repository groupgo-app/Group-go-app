import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const findUser = async (uid: string) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
      return false;
    }
    let userData = userSnapShot.data();
    return userData;
  } catch (error) {
    console.log(error);
  }
};

export const createUserDocument = async (user: any) => {
  const docRef = doc(db, "users", user.uid);
  const userObj = {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    displayName: user.displayName,
  };
  await setDoc(docRef, userObj);
};
