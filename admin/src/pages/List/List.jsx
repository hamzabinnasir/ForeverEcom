import { backendURL } from "../../App"
// import men from "../../assets/p_img2_1.png"
import { currency } from "../../App"
import { assets } from "../../assets/assets"
import axios from "axios"
import "./list.css"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify";
export default function List({ token }) {
    const [list, setList] = useState([]);
    const fetchList = async () => {
        try {
            const response = await axios.get(backendURL + "/api/product/list");
            // console.log(response.data.message);
            if (response.data.success) {
                setList(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendURL + "/api/product/remove", { id }, { headers: { token: token } });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList();
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchList();
    }, [])
    return (
        <>
            <div className="allProductSection">
                <h2>All Products List</h2>
                <div className="allProductFieldsContainer">
                    <p>image</p>
                    <p>name</p>
                    <p>category</p>
                    <p>price</p>
                    <p>action</p>
                </div>

                <div className="allProductContainer">
                    {
                        list.map((item, index) =>
                            <div key={index} className="productList">
                                <div className="img">
                                    <img src={item.image[0]} alt="no img" />
                                </div>
                                <div className="name">
                                    <p>{item.name}</p>
                                </div>
                                <div className="category">
                                    <p>{item.category}</p>
                                </div>
                                <div className="price">
                                    <p>{currency}{item.price}</p>
                                </div>
                                <div className="action">
                                    <button disabled onClick={()=>removeProduct(item._id)} id="deleteProductBtn">
                                        <img src={assets.cross_icon} alt="no img" />
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )

}
