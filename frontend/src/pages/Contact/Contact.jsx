import "./contact.css"
import React from "react"
import Title from "../../components/Title/Title"
import {assets} from "../../assets/assets"
export default function Contact(){
    return(
        <>
        <div className="contactSection">
            <div className="contactParent">
                <Title text1={"contact"} text2={"us"}/>
                <div className="contactContainer">
                    <img src={assets.contact_img} alt="no img" />
                    <div className="contactContext">
                        <h3>Our Store</h3>
                        <div className="address addDiv">
                            <p>54709 Willms Station</p>
                            <p>Suit 350, Washington, USA</p>
                        </div>
                        <div className="telEmail addDiv">
                            <p>Tel: (415) 555-0132</p>
                            <p>admin @forever.com</p>
                        </div>
                        <h3 className="careers">Careers at Forever</h3>
                        <p className="contactLearnP">Learn more about our team and Job Openings.</p>
                        <button id="exploreJobs">Explore Jobs</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}