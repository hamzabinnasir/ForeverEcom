import "./policy.css";
import React, { useState } from "react";

export default function Policy() {
    const [activePolicy, setActivePolicy] = useState(null);

    const policies = [
        {
            title: "Shipping Policy",
            content: [
                "Standard shipping: 3-5 business days",
                "Express shipping: 1-2 business days (additional charges apply)",
                "International shipping available to 50+ countries",
                "Free shipping on orders over $50",
                "Tracking information provided for all orders"
            ]
        },
        {
            title: "Return & Refund Policy",
            content: [
                "30-day return policy from delivery date",
                "Items must be unused, with original tags and packaging",
                "Refunds processed within 5-7 business days",
                "Exchanges available for defective/wrong items",
                "Return shipping costs are customer's responsibility unless item is defective"
            ]
        },
        {
            title: "Privacy Policy",
            content: [
                "We collect only necessary personal information for order processing",
                "Payment details are encrypted and never stored on our servers",
                "Customer data will never be sold to third parties",
                "You may request account deletion at any time",
                "We use cookies to enhance shopping experience"
            ]
        },
        {
            title: "Terms of Service",
            content: [
                "By using our site, you agree to these terms",
                "Products are sold 'as is' with manufacturer warranties",
                "We reserve the right to cancel suspicious orders",
                "Account holders must be 18+ years old",
                "Prices subject to change without notice"
            ]
        }
    ];

    const togglePolicy = (index) => {
        setActivePolicy(activePolicy === index ? null : index);
    };

    return (
        <div className="policyPageSection">
            <div className="policy-page">
                <div className="policy-header">
                    <h1>Our Policies</h1>
                    <p>Transparent guidelines for your shopping experience</p>
                </div>

                <div className="policy-container">
                    {policies.map((policy, index) => (
                        <div
                            className={`policy-card ${activePolicy === index ? 'active' : ''}`}
                            key={index}
                        >
                            <div
                                className="policy-title"
                                onClick={() => togglePolicy(index)}
                            >
                                <h2>{policy.title}</h2>
                                <span className="toggle-icon">
                                    {activePolicy === index ? '−' : '+'}
                                </span>
                            </div>

                            <div
                                className={`policy-content ${activePolicy === index ? 'show' : ''}`}
                            >
                                <ul>
                                    {policy.content.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="policy-contact">
                    <h3>Have questions about our policies?</h3>
                    <p>Contact our support team at <a href="mailto:policy@yourecommerce.com">policy@yourecommerce.com</a></p>
                </div>
            </div>
        </div>
    );
}