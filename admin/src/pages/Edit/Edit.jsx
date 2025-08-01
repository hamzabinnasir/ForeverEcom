import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom";
import { backendURL } from "../../App";
import "./edit.css";
const EditDesign = () => {
    const { aiImgId } = useParams();
    const navigate = useNavigate();
    const [singleAiImage, setSingleAiImage] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchDesign = async () => {
            try {
                const response = await axios.get(`${backendURL}/api/viewAaiImg/${aiImgId}`);
                if (response.data.success) {
                    setSingleAiImage(response.data?.singleAiImg);
                    setName(response.data?.singleAiImg?.name);
                    setDescription(response.data?.singleAiImg?.description);
                    setCategory(response.data?.singleAiImg?.category);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        };
        fetchDesign();
    }, [aiImgId, backendURL]);

    useEffect(() => {
        console.log(singleAiImage);
    }, [singleAiImage]);


    useEffect(() => {
        console.log(category);
    }, [category]);
    const updateAiImgContent = async () => {
        try {
            let payload = {
                aiImgId,
                name,
                category,
                description,
            }
            let response = await axios.post(`${backendURL}/api/editAiImg`, payload);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate(`/view/${response.data?.updatedAiImg?._id}`)
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="editPage">
            <h2>Edit Your Design</h2>
            <div className="editPageContainer">
                <div className="aiImgPreview">
                    <img src={singleAiImage?.aiImgurl} alt="Design Preview" />
                </div>
                <div className="editPageContainerContext">
                    <div className="editPageInputField">
                        <input
                            type="text"
                            name="name"
                            placeholder="Design Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled>
                                *- Select Category -*
                            </option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                        <textarea
                            className="editDescription"
                            name="description"
                            placeholder="Design Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button id="editPageBtn" onClick={updateAiImgContent}>
                        Update Design
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditDesign;
