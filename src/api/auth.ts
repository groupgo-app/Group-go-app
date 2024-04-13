import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import React from "react";
import { createUserDocument } from "./users";
import { toast } from "react-toastify";

const actionCodeSettings = {
  url: `${import.meta.env.VITE_REACT_SITE_URL}/create`,
  handleCodeInApp: true,
};

export const sendEmailLink = async (
  setIsEmailLinkLoading: React.Dispatch<React.SetStateAction<any>>,
  email: string,
) => {
  setIsEmailLinkLoading(true);
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    toast(
      "We have sent you an email with a link to sign in. Please make sure you are clicking the email on the same device that you are logging in with!",
      { type: "info" },
    );
    // setAlertMsg("");
    setIsEmailLinkLoading(false);
  } catch (error: any) {
    console.log(error.message);
    toast(`Sign in error :- ${error.message}`, { type: "error" });
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
  if (user) return;
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    signInWithEmailLink(auth, email!, window.location.href)
      .then((result) => {
        const newUser = result.user;
        createUserDocument(newUser);
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
};
