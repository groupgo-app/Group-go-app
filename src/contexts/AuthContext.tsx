import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserDocument } from "../api/users";
import { AuthContextState } from "../types/contexts";

export const AuthContext = createContext<AuthContextState | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [isEmailLinkLoading, setIsEmailLinkLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    if (user) {
      createUserDocument(user);
    } else {
      // console.log("no user doc to create");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        user,
        alertMsg,
        setAlertMsg,
        isEmailLinkLoading,
        setIsEmailLinkLoading,
        errorMsg,
        setErrorMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
