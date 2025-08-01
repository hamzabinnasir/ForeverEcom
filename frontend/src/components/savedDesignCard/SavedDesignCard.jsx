import "./savedDesignCard.css"
import React, { useContext } from "react"
import shopContext from "../../context/shopContext"
import { toast } from "react-toastify"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function SavedDesignCard({ imgUrl, imgStatus, imgId }) {
    const { backendURL } = useContext(shopContext);
    const navigate = useNavigate();

    const handleDeleteDesign = async (id) => {
        try {
            const response = await axios.post(backendURL + "/api/deleteDesign", { imgId: id });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <>
            <div className="design-card">
                <img
                    src={imgUrl}
                    alt="Design"
                    className="design-image"
                />
                {
                    !imgStatus ?
                        <p className="design-status">
                            Status: Pending
                        </p>
                        :
                        <p className="design-status">
                            Status: {imgStatus}
                        </p>
                }

                <div className="savedDesignCardBtnRow">
                    <button className="savedDesignBtn" id="viewDesignBtn">
                        <Link className="link" to={`/view/${imgId}`}>View</Link>
                    </button>
                    <button className="savedDesignBtn" id="deleteDesignBtn" onClick={() => handleDeleteDesign(imgId)}>Delete</button>
                    <button id="editDesignBtn" className="savedDesignBtn" onClick={() => navigate(`/edit/${imgId}`)}>Edit</button>
                </div>
            </div>
        </>
    )
}
