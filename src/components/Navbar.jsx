import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Avatar from "../assets/images/avatar.png";
import { motion, AnimatePresence } from "framer-motion";
import menuBar from "../assets/images/menu-bar.svg";
import { Link } from "react-router-dom";
import { CloseIcon } from "./Icon";

const Navbar = () => {
  const { handleLogOut, user } = useContext(AuthContext);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClikOpen = () => {
    setMenuOpen(false);
  };
  return (
    <>
      <nav>
        <div className="nav_items">
          <h4>
            <Link to={"/"}>groupgo</Link>
          </h4>
          <AnimatePresence>
            <motion.div
              className={`tablet:relative tablet:flex ${
                menuOpen ? "flex" : "hidden"
              }`}
            >
              <ul className="">
                {user ? (
                  <li>
                    <Link onClick={handleClikOpen} to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link onClick={handleClikOpen} to="/">
                      Home
                    </Link>
                  </li>
                )}

                <li>
                  <Link onClick={handleClikOpen} to={"/"}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClikOpen} to={"/"}>
                    How it works
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClikOpen} to={"/"}>
                    About us
                  </Link>
                </li>
                {!user && (
                  <li>
                    <Link
                      to={"/create"}
                      className="block rounded-[10px] bg-orange-clr px-[18px] py-2 text-white"
                    >
                      Create event
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <img
                      onClick={() => setToggleDropDown((prev) => !prev)}
                      className="h-[48px] w-[48px] cursor-pointer rounded-[999px]"
                      src={`${user.photoURL || Avatar}`}
                      alt=""
                    />
                  </li>
                )}

                {user && toggleDropDown && (
                  <div className="absolute left-0 top-[125px] ml-[25%] flex flex-col items-start gap-[16px] rounded-[16px] bg-white px-[18px] py-[18px] shadow-lg tablet:right-0 tablet:top-[50px] tablet:z-50">
                    <p className="text-[16px]">{user?.email}</p>
                    <button onClick={handleLogOut}>logout</button>
                  </div>
                )}
              </ul>
            </motion.div>
          </AnimatePresence>
          <div className="block cursor-pointer tablet:hidden">
            <button>
              {setMenuOpen ? (
                <img onClick={handleMenuOpen} src={menuBar} alt="" />
              ) : (
                <CloseIcon />
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
