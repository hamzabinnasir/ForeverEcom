import "./collection.css"
import React, { useContext, useState, useEffect } from "react"
import Title from "../../components/Title/Title"
import ProductItem from "../../components/ProductItem/ProductItem"
import shopContext from "../../context/shopContext"
import {assets} from "../../assets/assets"
export default function Collection() {
    const { products, currency, search, showSearch } = useContext(shopContext);
    const [filterProduct, setFilterProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("relavent");
    const [displayFilter, setDisplayFilter] = useState(false);

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => e.target.value !== item));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }


    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    }


    const applyFilter = () => {
        let productsCopy = products.slice();
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }
        setFilterProduct(productsCopy);
    }

    const sortProduct = () => {
        let fpCopy = filterProduct.slice();
        switch (sortType) {
            case "low-high":
                setFilterProduct(fpCopy.sort(function (a, b) { return a.price - b.price }));
                break;
            case "high-low":
                setFilterProduct(fpCopy.sort(function (a, b) { return b.price - a.price }));
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, showSearch, search, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <>
            <div className="collectionSection">
                <div className="collectionParent">
                    {/* Collection Left */}
                    <div className="collectionLeft">
                        <div className="HelloFilter">
                            <h3 className="cLeftH3">Filters</h3>
                            <img onClick={()=>setDisplayFilter(!(displayFilter))}  src={assets.dropdown_icon} alt="no img" />
                        </div>
                        <div className={displayFilter? "formContainer displayFilterContainer" : "formContainer"}>
                            {/* Filter Box */}
                            <form className="filterBox">
                                <h4>Categories</h4>
                                <div className="inputField">
                                    <input type="checkbox" value={"Man"} onChange={toggleCategory} />
                                    <p>Men</p>
                                </div>
                                <div className="inputField">
                                    <input type="checkbox" value={"Women"} onChange={toggleCategory} />
                                    <p>Women</p>
                                </div>
                                <div className="inputField">
                                    <input type="checkbox" value={"Kids"} onChange={toggleCategory} />
                                    <p>Kids</p>
                                </div>
                            </form>
                            {/* Filter Box */}
                            <form className="filterBox">
                                <h4>Type</h4>
                                <div className="inputField">
                                    <input type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
                                    <p>Topwear</p>
                                </div>
                                <div className="inputField">
                                    <input type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />
                                    <p>Bottomwear</p>
                                </div>
                                <div className="inputField">
                                    <input type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
                                    <p>Winterwear</p>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* Collection Right */}
                    <div className="collectionRight">
                        <div className="sortDivSection">
                            <Title text1={"All"} text2={"Collections"} />
                            <select onChange={(e) => setSortType(e.target.value)} id="selectMenu">
                                <option value="relavent">Sort by: Relavent</option>
                                <option value="low-high">Sort by: Low to High</option>
                                <option value="high-low">Sort by: High to Low</option>
                            </select>
                        </div>
                        <div className="allItemWrapper">
                            {
                                filterProduct.map((product, index) =>
                                    <ProductItem key={index} image={product.image[0]} name={product.name} price={product.price} currency={currency} productId={product._id} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



