import "./searchbar.css"
import React, { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import shopContext from "../../context/shopContext"
import { assets } from "../../assets/assets"
export default function Searchbar() {
    const location = useLocation();
    const { search, setSearch, showSearch, setShowSearch } = useContext(shopContext);
    const [visible , setVisible] = useState(true);
    useEffect(() =>{
        if(location.pathname.includes("/collection")){
            setVisible(true);
        }else{
            setVisible(false);
        }
    }, [location]);
    return (
        <>
            {
                showSearch && visible ?
                    <>
                        <div className="searchBarContainer">
                            <div className="searchBar">
                                <div className="searchField">
                                    <input type="text" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                                    <img src={assets.search_icon} alt="no img" />
                                </div>
                                <img onClick={() => setShowSearch(false)} id="crossImg" src={assets.cross_icon} alt="no img" />
                            </div>
                        </div>
                    </>
                    :
                    ""
            }
        </>
    )
}