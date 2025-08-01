import { backendURL } from "../../App";
import axios from "axios";
import "./add.css"
import React, { useState, useEffect } from "react"
import uploadArea from "../../assets/upload_area.png"
import { toast } from "react-toastify"
export default function Add({ token }) {

    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Shuttle Lace");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestSeller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendURL + "/api/product/add", formData, { headers: { token: token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice("");
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(response.data.message);
        }
    }
    return (
        <>
            <form onSubmit={(onSubmitHandler)} className="productAddFrom">
                <div className="inputField">
                    <p className="upImg">Upload Image</p>
                    <div className="uploadImgContainer">
                        <label htmlFor="image1">
                            <img src={!image1 ? uploadArea : URL.createObjectURL(image1)} alt="no img" />
                        </label>
                        <input onChange={(e) => setImage1(e.target.files[0])} id="image1" type="file" hidden />
                        <label htmlFor="image2">
                            <img src={!image2 ? uploadArea : URL.createObjectURL(image2)} alt="no img" />
                        </label>
                        <input onChange={(e) => setImage2(e.target.files[0])} id="image2" type="file" hidden />
                        <label htmlFor="image3">
                            <img src={!image3 ? uploadArea : URL.createObjectURL(image3)} alt="no img" />
                        </label>
                        <input onChange={(e) => setImage3(e.target.files[0])} id="image3" type="file" hidden />
                        <label htmlFor="image4">
                            <img src={!image4 ? uploadArea : URL.createObjectURL(image4)} alt="no img" />
                        </label>
                        <input onChange={(e) => setImage4(e.target.files[0])} id="image4" type="file" hidden />
                    </div>
                </div>

                <div className="productNameAndDescContainer">
                    <div className="inputField">
                        <p>Product name</p>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Type here" required />
                    </div>
                    <div className="inputField">
                        <p>Product description</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="adminDesc" placeholder="Write content here"></textarea>
                    </div>
                </div>

                <div className="inputFieldsContainer">
                    <div className="selectField">
                        <p>Product Category</p>
                        <select onChange={(e) => setCategory(e.target.value)} className="select">
                            <option value="Man">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kid</option>
                        </select>
                    </div>
                    <div className="selectField">
                        <p>Sub Category</p>
                        <select onChange={(e) => setSubCategory(e.target.value)} className="select">
                            <option value="Topwear">Topwear</option>
                            <option value="Winterwear">Winterwear</option>
                            <option value="Bottomwear">Bottomwear</option>
                        </select>
                    </div>
                    <div className="selectField">
                        <p>Product Price</p>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} className="select" type="number" placeholder="20"/>
                    </div>
                </div>

                <div className="productSizeContainer">
                    <p>Product Sizes</p>
                    <div className="productBtnContainer">
                        <p className={`${sizes.includes("S") ? "sizeBtn red" : "sizeBtn"}`} onClick={() => setSizes(
                            prev => prev.includes("S") ? prev.filter((item) => item !== 'S') : [...prev, 'S']
                        )}>S</p>
                        <p className={`${sizes.includes("M") ? "sizeBtn red" : "sizeBtn"}`} onClick={() => setSizes(
                            prev => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"]
                        )}>M</p>
                        <p className={`${sizes.includes("L") ? "sizeBtn red" : "sizeBtn"}`} onClick={() => setSizes(
                            prev => prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"]
                        )}>L</p>
                        <p className={`${sizes.includes("XL") ? "sizeBtn red" : "sizeBtn"}`} onClick={() => setSizes(
                            prev => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"]
                        )}>XL</p>
                        <p className={`${sizes.includes("XXL") ? "sizeBtn red" : "sizeBtn"}`} onClick={() => setSizes(
                            prev => prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"]
                        )}>XXL</p>
                    </div>
                </div>
                <div className="bestSeller">
                    <input onChange={() => setBestSeller(prev => !prev)} type="checkbox" checked={bestseller} />
                    <p>Add to Bestseller</p>
                </div>
                <button type="submit" id="adminAddProductBtn">Add</button>
            </form>
        </>
    )
}
