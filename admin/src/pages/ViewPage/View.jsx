import "./view.css"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { backendURL } from "../../App"

export default function View() {
    const navigate = useNavigate();
    const { aiImgId } = useParams();
    const [singleImage, setSingleImage] = useState("");

    useEffect(() => {
        const gettingSingleDesign = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/viewAaiImg/${aiImgId}`);
                if (response.data.success) {
                    setSingleImage(response.data.singleAiImg);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
        gettingSingleDesign();
    }, [aiImgId]);

    const handleDeleteDesign = async (aiImgId) => {
        try {
            const response = await axios.post(backendURL + "/api/deleteAiImg", { aiImgId });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/imageList");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="ViewDesignSection">
            {singleImage ? (
                <div className="viewImgSection">
                    {/* Image */}
                    <div className="imageSection">
                        <img src={singleImage?.aiImgurl} alt="Design" />
                    </div>

                    {/* Image Context */}
                    <div className="imgContextSecton">
                        {/* Image Name */}
                        <h2>{singleImage?.name}</h2>

                        {/* Image Category */}
                        <p className="imageCategory">
                            <strong>Category: </strong>
                            {
                                singleImage?.category ?
                                    <span>{singleImage?.category}</span>
                                    :
                                    <span>Draft</span>
                            }
                        </p>

                        {/* Image Description */}
                        <p className="imgDesDiv">
                            <strong>Description: </strong>
                            {
                                singleImage?.description ?
                                    <span>{singleImage?.description}</span>
                                    :
                                    <span>Draft</span>
                            }
                        </p>

                        {/* Image imgSize Section */}
                        <div className="imgSizeContainer">
                            <div className="imgActionBtns">
                                <button className="savedDesignBtn" id="deleteDesignBtn" onClick={() => handleDeleteDesign(aiImgId)}>Delete</button>
                                <button onClick={() => navigate(`/edit/${singleImage?._id}`)} id="editDesignBtn" className="savedDesignBtn">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <p>Image not found</p>
            )}
        </div>


    );
}