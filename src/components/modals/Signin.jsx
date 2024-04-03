import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FiAlertCircle, FiX } from "react-icons/fi";
import Loader from "../../assets/images/loader.svg";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineBellAlert } from "react-icons/hi2";
import * as EmailValidator from "email-validator";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebase";

const Signin = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);

  const {
    email,
    setEmail,
    sendEmailLink,
    handleSignInUser,
    navigate,
    user,
    search,
    alertMsg,
    // signInWithGoogle,
    isEmailLinkLoadong,
    setIsEmailLinkLoading,
    errorMsg,
    setErrorMsg,
    createUserDocument,
  } = useContext(AuthContext);

  useEffect(() => {
    handleSignInUser();
  }, [user, navigate, search]);

  const emailRef = useRef("");

  useEffect(() => {
    if (
      email !== emailRef.current ||
      isValidEmail !== EmailValidator.validate(email)
    ) {
      setIsValidEmail(EmailValidator.validate(email));
      emailRef.current = email; // Update reference with new email
    }
  }, [email, isValidEmail]);

  // const handleGoogleSignin = async () => {
  //   try {
  //     await signInWithGoogle();
  //     if (user) {
  //       // createUserDocument(user.uid, user.email, user.photoURL, user.displayName)
  //       navigate("/create");
  //     } else {
  //       console.log("unable to sign in");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg("");
      setIsEmailLinkLoading(false);
    }, 4000);
  }, [errorMsg]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="signin_bg_overlay"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="signin_container"
          >
            <form
              onSubmit={(event) => sendEmailLink(event, email)}
              className="relative"
            >
              <Link className="absolute right-[10px]" to={"/"}>
                <FiX />
              </Link>

              <div>
                <h2 className="text-[24px] tablet:text-[48px]">groupgo</h2>
                <p>Sign in or sign up to create an event</p>
              </div>
              <div className="mt-6 flex flex-col gap-[22px]">
                <fieldset className="field_set_div">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="inputs w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {alertMsg && (
                    <div className="flex items-center gap-1">
                      <HiOutlineBellAlert color="red" />
                      <span className="text-[12px]">{alertMsg}</span>
                    </div>
                  )}
                  {errorMsg && (
                    <div className="flex items-center gap-1">
                      <HiOutlineBellAlert color="red" />
                      <span className="text-[12px]">{errorMsg}</span>
                    </div>
                  )}
                </fieldset>
                <div>
                  <button
                    className="signin_btn bg-orange-clr text-white disabled:cursor-not-allowed disabled:opacity-30"
                    type="submit"
                    disabled={isValidEmail === false}
                  >
                    {isEmailLinkLoadong ? (
                      <img src={Loader} alt="loader" />
                    ) : (
                      "continue with email"
                    )}
                  </button>
                  <div
                    className="signin_btn mt-3 gap-2 bg-[#F8F8F8] text-black-clr"
                    onClick={signInWithGoogle}
                  >
                    <FcGoogle size={24} />
                    <span>Continue with google</span>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Signin;
