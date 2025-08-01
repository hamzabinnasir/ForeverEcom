import "./navbar.css"
import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"
import shopContext from "../../context/shopContext"
export default function Navbar() {
    const { setShowSearch, getTotalCart, token, setToken, setCartItem } = useContext(shopContext);
    const navigate = useNavigate();
    const [overLay, setOverLay] = useState(false);
    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItem({});
    }
    return (
        <>
            <nav id="navbar">
                <Link className={"link"} to={"/"}>
                    <img id="logo" src={assets.logo} alt="no img" />
                </Link>
                <ul className="navListContainer">
                    <NavLink className={"link"} to={"/"}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink className={"link"} to={"/collection"}>
                        <li>Collection</li>
                    </NavLink>
                    <NavLink className={"link"} to={"/about"}>
                        <li>About</li>
                    </NavLink>
                    <NavLink className={"link"} to={"/contact"}>
                        <li>Contact</li>
                    </NavLink>
                </ul>
                <div className="navIcons">
                    <li onClick={() => setShowSearch(true)} className="profileNavList"> <img src={assets.search_icon} alt="no img" /></li>
                    <li className="profileNav profileNavList">
                        <Link to={"/login"} className="link"><img id="profileIcon" src={assets.profile_icon} alt="no img" /></Link>
                        {
                            !token ?
                                ""
                                :
                                <ul className="profileBoxNavs">
                                    <Link className="link" to={"/"}> <li className="homeList">Home</li></Link>
                                    <Link className="link" to={"/order"}> <li className="helloLink">My Orders</li></Link>
                                    <li className="helloLink" onClick={logout}>Logout</li>
                                </ul>
                        }
                    </li>
                    <Link className="link" to={"/cart"}>
                        <li className="profileNavList counterDiv">
                            <img src={assets.cart_icon} alt="no img" />
                            <p className="navCounter">{getTotalCart()}</p>
                        </li>
                    </Link>
                </div>
            </nav>


            <div className="resNavParent">
                {/* Responsive Navbar */}
                <nav id="navbarRes">
                    <Link className={"link"} to={"/"}>
                        <img id="logo" src={assets.logo} alt="no img" />
                    </Link>

                    <div className="navIcons">
                        <li onClick={() => setShowSearch(true)} className="profileNavList"> <img src={assets.search_icon} alt="no img" /></li>
                        <li className="profileNav profileNavList">
                            <Link to={"/login"} className="link"><img id="profileIcon" src={assets.profile_icon} alt="no img" /></Link>
                            {
                                !token ?
                                    ""
                                    :
                                    <ul className="profileBoxNavs">
                                        <li>My profile</li>
                                        <Link className="link" to={"/order"}> <li>Orders</li></Link>
                                        <li onClick={logout}>Logout</li>
                                        <NavLink className={"link"} to={"/create"}>
                                            <li>Create Design</li>
                                        </NavLink>
                                        <NavLink className={"link"} to={"/saved"}>
                                            <li>Saved Design</li>
                                        </NavLink>
                                    </ul>
                            }
                        </li>
                        <Link className="link" to={"/cart"}>
                            <li className="profileNavList counterDiv">
                                <img src={assets.cart_icon} alt="no img" />
                                <p className="navCounter">{getTotalCart()}</p>
                            </li>
                        </Link>
                        <img onClick={() => setOverLay(true)} id="resNavImg" src={assets.menu_icon} alt="no img" />
                    </div>

                    {/* Overlay */}
                    <div className={overLay ? "navOverlay moveToLeft" : "navOverlay"}>
                        <ul>
                            <li onClick={() => setOverLay(false)} className="backOverlay">
                                <img src={assets.dropdown_icon} alt="no img" />
                                <p>Back</p></li>
                            <NavLink className={"link"} to={"/"}>
                                <li onClick={() => setOverLay(false)}>Home</li>
                            </NavLink>
                            <NavLink className={"link"} to={"/collection"}>
                                <li onClick={() => setOverLay(false)}>Collection</li>
                            </NavLink>
                            <NavLink className={"link"} to={"/about"}>
                                <li onClick={() => setOverLay(false)}>About</li>
                            </NavLink>
                            <NavLink className={"link"} to={"/contact"}>
                                <li onClick={() => setOverLay(false)}>Contact</li>
                            </NavLink>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}

