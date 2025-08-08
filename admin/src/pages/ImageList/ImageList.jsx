import { backendURL } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./imageList.css";
import { useNavigate } from "react-router-dom";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";

export default function List() {
    const [imgList, setImgList] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state
    const navigate = useNavigate();

    // Fetch the image list
    useEffect(() => {
        const getAllAiImages = async () => {
            setLoading(true);
            try {
                let response = await axios.get(`${backendURL}/api/allAiImgs`);
                if (response.data.success) {
                    setImgList(response.data.allAiImages);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getAllAiImages();
    }, [backendURL]);

    const updateImgStatus = async (e, imgId) => {
        const selectedStatus = e.target.value;
        try {
            const response = await axios.post(backendURL + "/api/updateImgStatus", {
                imgStatus: selectedStatus,
                imgId: imgId,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setImgList(prevList =>
                    prevList.map(img => img._id === imgId ? { ...img, status: selectedStatus } : img)
                );
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating status:", error.message);
            toast.error("Failed to update status");
        }
    };

    const handleDownload = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error("Failed to fetch the image");

            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            const link = document.createElement("a");

            link.href = imageObjectURL;
            link.download = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            link.click();
            URL.revokeObjectURL(imageObjectURL);
        } catch (error) {
            toast.error("Failed to download the image: " + error.message);
        }
    };

    const handleDeleteDesign = async (aiImgId) => {
        try {
            const response = await axios.post(backendURL + "/api/deleteAiImg", { aiImgId });
            if (response.data.success) {
                toast.success(response.data.message);
                setImgList(response.data.allAiImages);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
            <div className="image-list-container">
                {loading ? (
                    <div className="loaderWrapper">
                        <div className="neonLoader"></div>
                        <p className="loaderText">Loading your AI-generated designs...</p>
                    </div>
                ) : imgList.length === 0 ? (
                    <p>No images found.</p>
                ) : (
                    imgList.map((img, index) => (
                        <div key={index} className="image-item">
                            <img src={img?.aiImgurl} alt="generated" />
                            <p className="imgIdPara">
                                <span className="idBold">Image Id:</span> {img?._id}
                            </p>
                            <button id="imgDownloadBtn" onClick={() => handleDownload(img?.aiImgurl)}>
                                Download <DownloadForOfflineOutlinedIcon />
                            </button>

                            <div className="ImageActionBox">
                                <div className="imgListActionBtns">
                                    <button disabled id="deleteDesignBtn" onClick={() => handleDeleteDesign(img?._id)}>Delete Design</button>
                                    <button id="viewDesignBtn">
                                        <Link className="link" to={`/view/${img?._id}`}>View</Link>
                                    </button>
                                    <button id="addProductBtn" onClick={() => navigate("/add")}>Add Product</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
    );
}

