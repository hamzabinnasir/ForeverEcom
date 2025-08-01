import "./ourPolicy.css"
import React from "react"
import { assets } from "../../assets/assets"
export default function OurPolicy() {
    return (
        <>
            <div className="OurPolicySection">
                {/* Policy Card */}
                <div className="policyCard">
                    <img src={assets.exchange_icon} alt="no img" />
                    <h4>Easy Exchange Policy</h4>
                    <p>We offer hassle free exhange policy</p>
                </div>
                {/* Policy Card */}
                <div className="policyCard">
                    <img src={assets.quality_icon} alt="no img" />
                    <h4>7 Days Return Policy</h4>
                    <p>We provide 7 days free return policy</p>
                </div>
                {/* Policy Card */}
                <div className="policyCard">
                    <img src={assets.support_img} alt="no img" />
                    <h4>Best customer support</h4>
                    <p>We provide 24/7 customer support</p>
                </div>
            </div>
        </>
    )
}