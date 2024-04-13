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
    toast("We have sent you an email with a link to sign in.", {
      type: "success",
    });
  } catch (error: any) {
    toast(`Sign in error :- ${error.message}`, { type: "error" });
    window.location.href = import.meta.env.VITE_REACT_SITE_URL;
  } finally {
    setIsEmailLinkLoading(false);
  }
};

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};

export const logout = async (user: any, navigate: Function) => {
  if (!user) return;
  await signOut(auth);
  navigate("/");
};

export const handleSignInUser = async (user: any, navigate: Function) => {
  if (user) return;
  if (!isSignInWithEmailLink(auth, window.location.href)) return;

  let email = window.localStorage.getItem("emailForSignIn");
  if (!email)
    email = window.prompt("Please provide your email for confirmation");

  signInWithEmailLink(auth, email!, window.location.href)
    .then((result) => {
      const newUser = result.user;
      createUserDocument(newUser);
      navigate("/create");
    })
    .catch((err) => {
      toast("An error occured while loggin in", { type: "error" });
      navigate("/");
      if (err) return;
    })
    .finally(() => {
      window.localStorage.removeItem("emailForSignIn");
    });
};
