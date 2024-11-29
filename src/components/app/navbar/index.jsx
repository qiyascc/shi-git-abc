import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "@/constants/constant";
import styles from "./navbar.module.scss";
import { useLenis } from "lenis/react";
import PropTypes from "prop-types";
import Loader from "../loader";

const Navbar = ({ show }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const navigation = useNavigate();
  const location = useLocation();
  const handleCloseMenu = useCallback(() => {
    if (menuOpen || window.innerWidth < 576) {
      setIsClosing(true);
      const timeoutId = setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [menuOpen]);

  const handleClickOutside = useCallback(
    (e) => {
      if (e && ref.current && !ref.current.contains(e.target)) {
        handleCloseMenu();
      }
    },
    [handleCloseMenu]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleMenuClick = (e) => {
    setMenuOpen(true);
    e.stopPropagation();
  };

  const handleNavLinkClick = (path) => {
    setLoading(true);

    setTimeout(() => {
      window.scrollTo(0, 0);
      setLoading(false);
      navigation(path);
    }, 500);
  };

  useLenis(() => {
    handleCloseMenu();
  });

  return (
    <>
      <nav
        className={`grid place-items-center mt-14 transition-[opacity] ease-custom duration-200 ${styles.navbar}`}
        ref={ref}
        onClick={handleMenuClick}
      >
        <ul
          className={`${styles.navbar_list} 
          ${menuOpen ? styles.navbar_list_active : ""} 
          ${isClosing ? styles.navbar_list_hidden : ""} 
          ${show ? "opacity-0" : ""}`}
        >
          {menuOpen ? (
            navLinks.map((item) => (
              <li key={item.path}>
                <div
                  onClick={() => {
                    handleNavLinkClick(item.path);
                    handleClickOutside();
                  }}
                  className={`${styles.navbar_list_link} 
                  ${
                    location.pathname === item.path
                      ? styles.active_nav
                      : item.path === "/contact" &&
                        location.pathname.startsWith(item.path)
                      ? styles.active_nav
                      : item.path === "/works" &&
                        location.pathname.startsWith(item.path)
                      ? styles.active_nav
                      : ""
                  }`}
                >
                  {item.name}
                </div>
              </li>
            ))
          ) : (
            <button
              className={`${styles.navbar_list_link} bg-white text-text-color`}
            >
              Menu
            </button>
          )}
        </ul>
      </nav>
      {loading && <Loader />}
    </>
  );
};

Navbar.propTypes = {
  show: PropTypes.bool,
};

export default Navbar;
