import React, { useContext, useEffect, useState } from "react";
import cartIcon from "/images/cart-arrow-down.png";
import MenuIcon from "/images/Menu.png";
import CloseIcon from "/images/close-btn.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductCart } from "../Context/OveralProvider";
import { AuthContext } from "../Context/Authentication";
import useAuth from "../hooks/useAuth";
import axios from "../axiosApi/axios";

const NavItem = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartNumber, cartItems } = useContext(ProductCart);
  const { user, LogOut } = useContext(AuthContext);
  const location = useLocation();
  const [menuActive, setMenuActive] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const selectMenuActive = () => {
      if (location.pathname == "/") {
        setMenuActive("/");
      } else if (location.pathname == "/shop") {
        setMenuActive("/shop");
      }
    };

    selectMenuActive();
  }, [menuActive]);

  const handleScroll = (activeName) => {
    window.scroll(0, 0);
    setMenuOpen(false);
    setMenuActive(activeName);
  };


  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      setAuth({});
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper-nav-div">
      <div id="logo-nav-div">
        <Link
          to="/"
          onClick={() => window.scroll(0, 0)}
          style={{ textDecoration: "none" }}
          className="logo"
        >
          LOGO
        </Link>
        <div id="nav-icons">
          <nav>
            <div id="navLinks" className={menuOpen ? "activeNavLink" : ""}>
              <Link
                onClick={() => handleScroll("/")}
                to="/"
                className={`nav-item ${
                  menuActive === "/" ? "active" : ""
                } navLink`}
              >
                Home
              </Link>
              <Link
                onClick={() => handleScroll("/shop")}
                to="/shop"
                className={`nav-item ${
                  menuActive === "/shop" ? "active" : ""
                } navLink`}
              >
                Shop
              </Link>
              {auth.accessToken && (
                <Link
                  onClick={() => handleScroll("/orders")}
                  to="/orders"
                  className={`nav-item ${
                    menuActive === "/orders" ? "active" : ""
                  } navLink`}
                >
                  Orders
                </Link>
              )}
            </div>
            {auth.accessToken ? (
              <div className="nameLogout">
                <p className="logoutCart">Welcome {auth.username}</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  onClick={() => window.scroll(0, 0)}
                  className="nav-item signUp"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  onClick={() => window.scroll(0, 0)}
                  className="nav-item login"
                >
                  Login
                </Link>
              </>
            )}
            <div
              className="nav-icon"
              id={`${user ? "cartBtn" : "cartBtnLogout"}`}
            >
              <Link to="/cart">
                <img src={cartIcon} alt="" />
              </Link>
              <span className={`${user ? "num" : "numLogout"}`}>
                {cartItems ? cartNumber : 0}
              </span>
            </div>
            <div id="menuBtn" onClick={(e) => setMenuOpen(!menuOpen)}>
              <img src={menuOpen ? CloseIcon : MenuIcon} alt="" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavItem;
