import "./latestCollection.css"
import React, { useContext , useEffect , useState } from "react"
import ShopContext from "../../context/shopContext"
import Title from "../Title/Title"
import ProductItem from "../ProductItem/ProductItem"
export default function LatestCollection() {
    const { products , currency } = useContext(ShopContext);
    const [latestProduct , setLatestProduct] = useState([]);
    useEffect(() =>{
        setLatestProduct(products.slice(0,10));
    } , [products]);
    return (
        <>
            <div className="latestCollectionSection">
                <Title text1={"Latest"} text2={"Collections"} />
                <p className="latestPara">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium vitae numquam natus itaque sunt commodi blanditiis iste ea!</p>
                <div className="productItemWrapper">
                    {
                        latestProduct.map((product , index) =>
                            <ProductItem key={index} productId={product._id} image={product.image[0]} name={product.name} price={product.price} currency={currency}/>
                        )
                    }
                </div>
            </div>
        </>
    )
}