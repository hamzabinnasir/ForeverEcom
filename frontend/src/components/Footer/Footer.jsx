import "./footer.css"
import React from "react"
import { Link } from "react-router-dom"
import { assets } from "../../assets/assets"
export default function Footer() {
    return (
        <>
            <footer id="footerSection">
                <div className="footerPartOne">
                    <div className="footerContext">
                        <img src={assets.logo} alt="no img" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis itaque laudantium quod, commodi esse labore nostrum ut, magni aliquam et blanditiis sunt consectetur iure voluptatibus assumenda quasi consequatur, quam tenetur excepturi ab atque doloremque dicta autem cumque.</p>
                    </div>
                    <div className="footerCol footerCol1">
                        <h2>company</h2>
                        <ul className="footerListContainer">
                            <Link className="link" to={"/"}>
                                <li>Home</li>
                            </Link>
                            <Link className="link" to={"/about"}>
                                <li>About Us</li>
                            </Link>
                            <Link className="link" to={"/support"}>
                                <li>Customer Support</li>
                            </Link>
                            <Link className="link" to={"/contact"}>
                                <li>Contact Us</li>
                            </Link>
                            <Link className="link" to={"/policies"}>
                                <li>Privacy Policy</li>
                            </Link>
                        </ul>
                    </div>
                    <div className="footerCol footerCol2">
                        <h2>get in touch</h2>
                        <ul className="footerListContainer">
                            <li>+1-212-456-7890</li>
                            <li>contact@foreveryou.com</li>
                        </ul>
                    </div>
                </div>

                <div className="footerPartTwo">
                    <p>Copyright 2024@ forever.com - All Right Reserved.</p>
                </div>
            </footer>
        </>
    )
}