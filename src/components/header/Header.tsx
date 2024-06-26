import React, { useState } from "react";
import {
  FaHome,
  FaShopify,
  FaInfoCircle,
  FaPhone,
  FaShoppingCart,
} from "react-icons/fa";
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types/rootState";
import { appWriteService } from "../../service";
import LoadingBar from "react-top-loading-bar";
import { logout as clientLogout } from "../../features/authSlice";
import { IoLogOut } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";
const Header = () => {
  const isActive = useSelector((state: RootState) => state.auth.status);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const navItems = [
    { name: "Home", href: "/", icon: <FaHome />, isActive: isActive },
    {
      name: "About",
      href: "/about",
      icon: <FaInfoCircle />,
      isActive: isActive,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <FaPhone />,
      isActive: isActive,
    },
    { name: "Review", href: "/reviews", icon: <MdOutlinePreview />, isActive: isActive },
    { name: "login", href: "/login", icon: <FaPhone />, isActive: isActive },
  ];

  const logout = async () => {
    await appWriteService.logout();
    dispatch(clientLogout());
    window.location.assign("/login");
  };
  return (
    <nav className="gogo-nav">
      <LoadingBar
        color="#ff6347"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="gogo-logo">
        <Link to="/">
          <img
            src="./images/logo.png"
            alt=""
            height={100}
            onClick={() => setProgress(100)}
          />
        </Link>
      </div>
      <ul className="gogo-nav-links">
        {navItems.map((item, index) =>
          item.isActive && item.name === "login" ? (
            <li key={index}>
              <NavLink to="/dash" onClick={() => setProgress(100)} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>
                Dash
              </NavLink>
            </li>
          ) : (
            <li key={index}>
              <NavLink to={item.href} onClick={() => setProgress(100)} className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }>
                {item.icon} {item.name}
              </NavLink>
            </li>
          )
        )}

        {isActive && (
          <li className="gogo-logout">
            <button onClick={logout}>{<IoLogOut />}Logout</button>
          </li>
        )}
      </ul>
      <div className="gogo-cart">
        <div className="gogo-search">
          <input type="search" placeholder="Search..." />
        </div>
        <NavLink to="/cart" onClick={() => setProgress(100)} className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>
          <FaShoppingCart /> Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default React.memo(Header);
