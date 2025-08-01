import "./home.css"
import React from "react"
import Hero from "../../components/Hero/Hero"
import LatestCollection from "../../components/LatestCollection/LatestCollection"
import BestSeller from "../../components/BestSeller/BestSeller"
import OurPolicy from "../../components/OurPolicy/OurPolicy"
import NewsLetter from "../../components/NewsLetter/NewsLetter"
export default function Home() {
    return (
        <>
            <div className="homeWrapper">
                <Hero />
                <LatestCollection/>
                <BestSeller/>
                <OurPolicy/>
                <NewsLetter/>
            </div>
        </>
    )
}