import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "../assets/images/avatar.png";
import { motion, AnimatePresence } from "framer-motion";
// import menuBar from "../assets/images/menu-bar.svg";
import { Link, useNavigate } from "react-router-dom";
// import { CloseIcon } from "./Icon";
import { logout } from "../api/auth";
import { FormContext } from "../contexts/FormContext";
import { AppContext } from "../contexts/AppContext";
import { initialEventData } from "../data/events";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { setEventData } = useContext(FormContext);
  const { setCurrentStep, creationSteps } = useContext(AppContext);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const navigate = useNavigate();

  const handleClikOpen = () => {
    setToggleDropDown(false);
  };
  return (
    <>
      <nav>
        <div className="nav_items">
          <h4>
            <Link to={"/"}>groupgo</Link>
          </h4>
          <AnimatePresence>
            <motion.div className={`relative`}>
              {user ? (
                <>
                  <img
                    onClick={() => setToggleDropDown((prev) => !prev)}
                    className="h-[48px] w-[48px] cursor-pointer rounded-[999px]"
                    src={`${user.photoURL || Avatar}`}
                    alt=""
                  />
                  {toggleDropDown && (
                    <>
                      <div className="absolute -left-[200px] top-[55px] ml-[25%] flex w-fit flex-col items-start gap-[16px] rounded-[16px] bg-white px-[18px] py-[18px] shadow-lg  tablet:right-0 tablet:top-[50px] tablet:z-50">
                        <Link
                          onClick={handleClikOpen}
                          to={"/"}
                          className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-300"
                        >
                          Home
                        </Link>

                        <Link
                          onClick={handleClikOpen}
                          to="/dashboard"
                          className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-300"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to={"/create"}
                          onClick={() => {
                            handleClikOpen();
                            setEventData(initialEventData);
                            setCurrentStep!(creationSteps![0]);
                          }}
                          className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-300"
                        >
                          Create Event
                        </Link>

                        <div className="h-[2px] w-full bg-black"></div>

                        <button
                          onClick={() => {
                            logout(user, navigate);
                          }}
                          className="w-full cursor-pointer rounded-md p-2 hover:bg-gray-300"
                        >
                          <span className="flex w-full items-center">
                            Logout
                          </span>
                          <p className="text-xs">{user?.email}</p>
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <ul className="flex items-center gap-4">
                  <li>
                    <Link onClick={handleClikOpen} to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/create"}
                      className="block rounded-[10px] bg-orange-clr px-[18px] py-2 text-white"
                    >
                      Create event
                    </Link>
                  </li>
                </ul>
              )}
            </motion.div>
          </AnimatePresence>

          {/* <div className="block cursor-pointer">
            <button onClick={handleMenuOpen}>
              {menuOpen ? <CloseIcon /> : <img src={menuBar} alt="" />}
            </button>
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
