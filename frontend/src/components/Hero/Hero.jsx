import "./hero.css"
import React from "react"
// import heroImg from "../../assets/hero_img.png"
export default function Hero() {
    return (
        <>
            <div className="heroSection">
                <div className="heroLeft">
                    <div className="heroContext">
                        <div className="paraDiv paraDiv1">
                            <hr />
                            <p>our bestsellers</p>
                        </div>
                        <h1 className="prata-regular">Latest Arrivals</h1>
                        <div className="paraDiv paraDiv2">
                            <p>shop now</p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="heroRight">
                    <img src="blob:https://web.whatsapp.com/f5792e0d-47b7-4d86-955c-213cb6a5101f" alt="no img" />
                </div>
            </div>
        </>
    )

}
