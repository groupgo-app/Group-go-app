import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserDocument } from "../api/users";

type ContextState = {
  email?: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  user?: any | null | undefined;
  alertMsg?: string;
  setAlertMsg?: React.Dispatch<React.SetStateAction<string>>;
  isEmailLinkLoading?: boolean;
  setIsEmailLinkLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  errorMsg?: string;
  setErrorMsg?: React.Dispatch<React.SetStateAction<string>>;
};
export const AuthContext = createContext<ContextState>({});

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
