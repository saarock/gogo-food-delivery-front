import React from "react";
import { FaAppleAlt, FaCoffee, FaVest } from "react-icons/fa";
import "./sideNav.css";
import { Link, useNavigate } from "react-router-dom";

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const foodCategories = [
    { name: "Breakfast", icon: <FaCoffee /> },
    { name: "Dairy", icon: <FaCoffee /> },
    { name: "Cooked", icon: <FaCoffee /> },
  ];

  const clothingCategories = [
    { name: "Jeans", icon: <FaAppleAlt /> },
    { name: "Jackets", icon: <FaAppleAlt /> },
    { name: "Vests", icon: <FaVest /> },
  ];

  return (
    <div className="gogo-side-nav">
      <div className="gogo-side-nav-section">
        <h3>Food</h3>
        <ul>
          {foodCategories.map((category, index) => (
            <li key={category.name} onClick={() => navigate(`/${category.name.toString().toLowerCase()}`)}>
              {category.icon} {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="gogo-side-nav-section">
        <h3>Clothing</h3>
        <ul>
          {clothingCategories.map((category, index) => (
            <li
              key={category.name}
              onClick={() =>
                navigate(`clothings/${category.name.toLowerCase()}`)
              }
            >
              {category.icon} {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="gogo-terms-and-conditions-btn"
        onClick={() => navigate("/gogo-terms-and-conditions")}
      >
        <Link to="/gogo-terms-and-conditions" className="button-link">
          Terms and Conditions
        </Link>
      </div>
    </div>
  );
};

export default React.memo(SideNav);
