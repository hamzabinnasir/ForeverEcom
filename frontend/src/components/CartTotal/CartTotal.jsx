import "./cartTotal.css"
import React, { useContext } from "react"
import Title from "../Title/Title";
import shopContext from "../../context/shopContext"
export default function CartTotal() {
    const { getCartAmount, currency, delivery_fee } = useContext(shopContext);
    return (
        <>
            <div className="cartTotalSection">
                <div className="cartTotalParent">
                    <Title text1={"cart"} text2={"totals"} />
                    <div className="cartTotalContainer">
                        <div className="totalDiv subTotal">
                            <p>Subtotal</p>
                            <p>{currency}{getCartAmount()}.00</p>
                        </div>
                        <div className="totalDiv shippingDiv">
                            <p>Shipping Fee</p>
                            <p>{currency}{delivery_fee}.00</p>
                        </div>
                        <div className="totalDiv totalAmountDiv">
                            <p>Total</p>
                            <p>{currency}{getCartAmount() + delivery_fee}.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}