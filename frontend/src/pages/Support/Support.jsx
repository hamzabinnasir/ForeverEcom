import "./support.css";
import React, { useState } from "react";

export default function Support() {
    const accessKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append("access_key", accessKey);
        formDataObj.append("name", formData.name);
        formDataObj.append("email", formData.email);
        formDataObj.append("subject", formData.subject);
        formDataObj.append("message", formData.message);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formDataObj
        });

        const result = await response.json();
        if (result.success) {
            setSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // eCommerce FAQs
    const faqs = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by logging into your account and visiting the 'Order History' section. Tracking information is also emailed once your order ships."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns within 30 days. Items must be unused with original packaging. Contact support to initiate a return."
        },
        {
            question: "How can I change my shipping address?",
            answer: "For unshipped orders, update your address in account settings. For shipped orders, contact us immediately with your order number."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All payments are processed securely."
        },
        {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days in the US. International shipping takes 7-14 business days. Expedited options are available."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship worldwide. International orders may be subject to customs fees which are the customer's responsibility."
        },
        {
            question: "My promo code isn't working. What should I do?",
            answer: "Check the code is entered correctly and hasn't expired. Some codes have minimum purchase requirements. Contact support if issues persist."
        },
        {
            question: "How do I cancel or modify my order?",
            answer: "Orders can be modified within 1 hour of placement. After that, contact support immediately. We may not be able to cancel orders already in shipping."
        }
    ];

    return (
        <>
            <div className="supportPageSection">
                <div className="support-page">
                    <div className="support-header">
                        <h1>Customer Support</h1>
                        <p>We're here to help! Contact us with any questions or issues.</p>
                    </div>

                    <div className="support-container">
                        {submitted ? (
                            <div className="success-message">
                                <h2>Thank you for contacting us!</h2>
                                <p>We've received your message and will get back to you within 24 hours.</p>
                                <button
                                    className="back-button"
                                    onClick={() => setSubmitted(false)}
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="contact-methods">
                                    <div className="contact-card">
                                        <div className="contact-icon">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <h3>Email Us</h3>
                                        <p>support@yourstore.com</p>
                                    </div>

                                    <div className="contact-card">
                                        <div className="contact-icon">
                                            <i className="fas fa-phone"></i>
                                        </div>
                                        <h3>Call Us</h3>
                                        <p>+1 (555) 123-4567</p>
                                    </div>

                                    <div className="contact-card">
                                        <div className="contact-icon">
                                            <i className="fas fa-clock"></i>
                                        </div>
                                        <h3>Hours</h3>
                                        <p>Mon-Fri: 9AM-5PM EST</p>
                                    </div>
                                </div>

                                <form className="support-form" onSubmit={handleSubmit}>
                                    <input
                                        type="hidden"
                                        name="access_key"
                                        value={accessKey}
                                    />
                                    <input
                                        type="hidden"
                                        name="redirect"
                                        value="https://yourdomain.com/thank-you"
                                    />

                                    <h2>Send us a message</h2>

                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject">Subject *</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Your Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            name="consent"
                                            required
                                        />
                                        <label htmlFor="consent">I agree to the privacy policy *</label>
                                    </div>

                                    <button type="submit" className="submit-button">
                                        Send Message
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="faq-section">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-container">
                            {faqs.map((faq, index) => (
                                <div className="faq-item" key={index}>
                                    <button
                                        className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                                        onClick={() => toggleAccordion(index)}
                                        aria-expanded={activeIndex === index}
                                        aria-controls={`faq-answer-${index}`}
                                    >
                                        {faq.question}
                                        <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
                                    </button>
                                    <div
                                        id={`faq-answer-${index}`}
                                        className={`faq-answer ${activeIndex === index ? 'active' : ''}`}
                                    >
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}