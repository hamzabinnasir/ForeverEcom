import "./title.css"
import React from "react"
export default function Title({ text1, text2 }) {
    return (
        <>
            <div className="titleDiv">
                <h1 className="title"><span className="titleLight">{text1}</span> <span className="titleBold">{text2}</span></h1>
                <hr />
            </div>
        </>
    )
}