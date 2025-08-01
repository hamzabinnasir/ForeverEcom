import "./about.css"
import React from "react"
import Title from "../../components/Title/Title"
import NewsLetter from "../../components/NewsLetter/NewsLetter"
import { assets } from "../../assets/assets"
export default function About() {
    return (
        <>
            <div className="aboutSection">
                <div className="aboutParent">
                    <Title text1={"About"} text2={"us"} />
                    <div className="aboutContainer">
                        <img src={assets.about_img} alt="no img" />
                        <div className="aboutContext">
                            <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people online. Our journey began with a simple idea: to provide a plateform where customers can easily discover, explore and purchase a wide range of products from the confirt of their homes.</p>
                            <p className="aboutSecP">Since our inception, we're worked tirelessly to curate a diverse selection of high-quality that caters to every taste and preference. Form the fassionand beauty to the electrnics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
                            <h4>Our Mission</h4>
                            <p className="aboutMissionp">Our mission at Forever is to empower customers with choice, convinience and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering and delivery and beyond.</p>
                        </div>
                    </div>
                    <div className="aboutChoseUs">
                        <Title text1={"Why"} text2={"Chose us"} />
                        <div className="aboutCardsContainer">
                            <div className="aboutCard">
                                <h4>Quality assurance</h4>
                                <p>We meticulously select and vet each product to ensure it meets our stringnet quality standards.</p>
                            </div>
                            <div className="aboutCard">
                                <h4>Convenience</h4>
                                <p>With our user-friendly inteface and hassle-free ordering process, shopping has never been easier.</p>
                            </div>
                            <div className="aboutCard">
                                <h4>Exceptional Customer Service:</h4>
                                <p>Our team of dedicated profesional is here to assist you the way, ensuring your satisfaction is our top priority.</p>
                            </div>
                        </div>
                    </div>
                    <NewsLetter />
                </div>
            </div>
        </>
    )
}