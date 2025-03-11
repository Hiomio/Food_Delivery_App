import React, { useState, useEffect, useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [iconColor, setIconColor] = useState(""); // Set initial icon color to be empty

  // Toggle theme and icon color
  const toggleTheme = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      if (newMode) {
        setIconColor("gold"); // Change icon color to gold when dark mode is activated
      } else {
        setIconColor(""); // Reset to default color when light mode is active
      }
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />
      <ul className="navbar-menu">
        <li className="active">Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="Basket" />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
      <div className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? (
          <FaSun size={20} color={iconColor} /> // If dark mode is active, apply gold color
        ) : (
          <FaMoon size={20} color={iconColor} /> // If light mode, icon color is default
        )}
      </div>
    </div>
  );
};

export default Navbar;
