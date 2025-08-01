import "./productItem.css"
import React from "react"
import { Link } from "react-router-dom"
export default function ProductItem({ image, productId, price, name, currency }) {
    return (
        <>
            <Link className="link" to={`/product/${productId}`}>
                <div className="productItem">
                    <div className="imgBox">
                        <img src={image} alt="no img" />
                    </div>
                    <p className="namePara">{name}</p>
                    <p className="ProductPricePara">{currency}{price}</p>
                </div>
            </Link>
        </>
    )
}