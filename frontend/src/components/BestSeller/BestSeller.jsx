import "./bestSeller.css"
import React, { useContext, useEffect, useState } from "react"
import shopContext from "../../context/shopContext"
import ProductItem from "../../components/ProductItem/ProductItem"
import Title from "../Title/Title"
export default function BestSeller() {
    const { products , currency } = useContext(shopContext);
    const [bestProduct, setBestProduct] = useState([]);
    useEffect(() => {
        // console.log("Products: ", products);
        const bestProducts = products.filter((product) => product.bestseller);
        setBestProduct(bestProducts.slice(0, 5));
    }, [products]);
    return (
        <>
            <div className="bestSellerSection">
                <Title text1={"Best"} text2={"Sellers"} />
                <p className="bestSellerPara">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta repellat pariatur aperiam? Dolor quod molestiae consequuntur dolorum suscipit?</p>
                <div className="bestSellerWrapper">
                    {
                        bestProduct.map((product, index) =>
                            <ProductItem key={index} image={product.image[0]} name={product.name} currency={currency} price={product.price} productId={product._id}/>
                        )
                    }
                </div>
            </div>
        </>
    )
}