import "./navbar.css";
import React, { useContext, useState } from "react";
import { JarvisContext } from "../../JarvisContext/JarvisProvider";
import { assets } from "../../assets/assets";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Navbar({ setToken }) {
    const { isActive, setIsActive } = useContext(JarvisContext);
    const [boomEffect, setBoomEffect] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleToggle = () => {
        if (!isActive) {
            setBoomEffect(true);
            setTimeout(() => setBoomEffect(false), 300);
        }
        setIsActive(prev => !prev);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(prev => !prev);
    };

    return (
        <nav id="adminNavbar">
            <div className="adminNavContext">
                <img id="adminNavLogo" src={assets.logo} alt="no img" />
                <p className="navText">admin panel</p>
                <button className="menuToggleBtn" onClick={toggleMobileMenu}>
                    {showMobileMenu ? <FaAngleUp /> : <FaAngleDown />}
                </button>
            </div>

            <div className={`adminNavButtons ${showMobileMenu ? "showMenu" : ""}`}>
                <button id="logoutBtn" onClick={() => setToken("")}>Logout</button>
                <button
                    className={`jarvisToggleBtn ${isActive ? "active" : ""} ${boomEffect ? "boom" : ""}`}
                    onClick={handleToggle}
                >
                    <span className="pulse" />
                    <span className="sparks" />
                    {isActive ? "Deactivate Jarvis" : "Activate Jarvis"}
                </button>
            </div>
        </nav>
    );
}
