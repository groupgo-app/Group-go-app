import { createContext, useState } from "react";
import { auth } from "../config/firebase";
import {
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [isEmailLinkLoadong, setIsEmailLinkLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate("");

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "https://groupgo.netlify.app/create",
    handleCodeInApp: true,
    dynamicLinkDomain: "groupgo.netlify.app",
  };

  const sendEmailLink = async (event, email) => {
    event.preventDefault();
    setIsEmailLinkLoading(true);
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        setAlertMsg("we have sent you an email with a link to sign in");
        setIsEmailLinkLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSignInUser = () => {
    if (user) {
      return;
    } else {
      // Confirm the link is a sign-in with email link.

      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again.
          email = window.prompt("Please provide your email for confirmation");
        }
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // console.log(result.user);
            // Clear email from storage
            window.localStorage.removeItem("emailForSignIn");
            navigate("/create");
          })
          .catch((err) => {
            console.log(err);
            navigate("/login");
          });
      } else {
        console.log("pls sign in");
      }
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleLogOut = async () => {
    if (!user) {
      return;
    } else {
      try {
        await signOut(auth);
        navigate("/");
      } catch (error) {
        window.prompt("logout");
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        sendEmailLink,
        email,
        setEmail,
        handleSignInUser,
        user,
        navigate,
        search,
        alertMsg,
        signInWithGoogle,
        isEmailLinkLoadong,
        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};