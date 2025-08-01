import "./newsLetter.css"
import React from "react"
export default function NewsLetter() {
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    return (
        <>
            <div className="newsLetterSection">
                <h1>Subscribe now & get 20% off</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, non?</p>
                <form className="newsLetterForm" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter your email"/>
                    <button type="submit" id="subscribeBtn">subscribe</button>
                </form>
            </div>
        </>
    )
}