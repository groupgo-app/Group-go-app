import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import React from "react";

const actionCodeSettings = {
  url: import.meta.env.VITE_REACT_SITE_URL,
  handleCodeInApp: true,
};

export const sendEmailLink = async (
  setIsEmailLinkLoading: React.Dispatch<React.SetStateAction<any>>,
  setAlertMsg: React.Dispatch<React.SetStateAction<string>>,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>,
  email: string,
) => {
  setIsEmailLinkLoading(true);
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    setAlertMsg("we have sent you an email with a link to sign in");
    setIsEmailLinkLoading(false);
  } catch (error: any) {
    console.log(error.message);
    setErrorMsg(`Sign in error :- ${error.message}`);
  }
};

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};

export const logout = async (user: any, navigate: Function) => {
  if (user) {
    await signOut(auth);
    navigate("/");
  } else {
    return;
  }
};

export const handleSignInUser = async (user: any, navigate: Function) => {
  if (user) {
    return;
  } else {
    // Confirm the link is a sign-in with email link.

    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }
      signInWithEmailLink(auth, email!, window.location.href)
        .then((result) => {
          // const newUser = result.user
          // createUserDocument(newUser.uid, newUser.email, newUser.photoURL, newUser.displayName)
          // Clear email from storage
          window.localStorage.removeItem("emailForSignIn");
          navigate("/create");
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    } else {
      // console.log("pls sign in");
    }
  }
};
