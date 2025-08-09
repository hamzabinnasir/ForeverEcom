import "./hero.css"
import React from "react"
// import heroImg from "../../assets/hero_img.png"
import heroImg2 from "../../assets/heroImg2.jpg"
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
                    <img src={heroImg2} alt="no img" />
                </div>
            </div>
        </>
    )

}






