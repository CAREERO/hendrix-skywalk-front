import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserNinja } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "../../common/Tooltip/Tooltip";
import CartModal from "../../Cart/CartModal"; // Import CartModal component
import classes from "./Header.module.scss";

const Header: React.FC = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const accessToken = localStorage.getItem("accessToken");
    const userIsLoggedIn = userInfo !== null && accessToken;

    if (userIsLoggedIn) {
      try {
        const userInfoData = JSON.parse(userInfo!);
        setUserName(userInfoData.username ?? "");
      } catch (error) {
        console.error("Error parsing userInfo:", error);
      }
    }

    setLoggedIn(!!userIsLoggedIn);
  }, []);

  const openUserMenuHandler = () => {
    if (isLoggedIn) {
      setMenuOpen(true);
    } else {
      setSubmenuOpen(true);
    }
  };

  const menuToggleHandler = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    setSubmenuOpen(false); // Close the submenu when the main menu is toggled
  };

  const openUserSubMenuHandler = () => {
    setSubmenuOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setLoggedIn(false);
    history("/");
  };

  const toggleCartModal = () => {
    setCartOpen((prevCartOpen) => !prevCartOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/">
          <img
            src="https://i.pinimg.com/736x/6d/e0/22/6de0228201af080a78721ba81f3224f1.jpg"
            alt="Logo"
            className={classes.header__content__logo}
          />
        </Link>

        <nav
          className={`${classes.header__content__nav} ${menuOpen ? classes.isMenu : ""
            }`}
        >
          <ul>
            <li>
              <Link to="/" title="Home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" title="Shop">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/rewards" title="Rewards">
                Rewards
              </Link>
            </li>
          </ul>
          <Tooltip text="/Cart">
            <button
              className={classes.btn_cart}
              onClick={toggleCartModal} // Toggle cart modal on click
            >
              <FaCartShopping />
            </button>
          </Tooltip>
          {isLoggedIn ? (
            <div className={classes.userContainer}>
              <span
                className={classes.userName}
                onClick={openUserSubMenuHandler}
              >
                {userName}
              </span>
              <button onClick={openUserMenuHandler} className={classes.btn_ninja}>
                <FaUserNinja />
              </button>
              {submenuOpen && (
                <ul className={classes.subMenu}>
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setSubmenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" onClick={() => setSubmenuOpen(false)}>
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/productCreate"
                      onClick={() => setSubmenuOpen(false)}
                    >
                      Create Product
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Tooltip text="Login">
                <button
                  className={classes.btn_cart}
                  onClick={openUserMenuHandler}
                >
                  <FaUserNinja />
                </button>
              </Tooltip>
            </Link>
          )}
        </nav>

        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
      {/* Render CartModal component with conditional rendering based on modal visibility */}
      {cartOpen && <CartModal closeModal={toggleCartModal} />}
    </header>
  );
};

export default Header;
