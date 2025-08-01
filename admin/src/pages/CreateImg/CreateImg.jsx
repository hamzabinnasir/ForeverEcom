import "./createImg.css";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendURL } from "../../App";

export default function CreateImg() {
    const [imagePrompt, setImagePrompt] = useState("");
    const [aiImageData, setAiImageData] = useState("");
    const [loading, setLoading] = useState(false);

    const createAiImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAiImageData(""); // Clear previous image while loading new one
        try {
            let response = await axios.post(`${backendURL}/api/createAiImg`, { imagePrompt });
            if (response.data.success) {
                setAiImageData(response.data.createdAiImg);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Image generation failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="adminCreateImgPage">
            <h1 className="imgPageTitle">⚡ Create your AI image</h1>
            <form onSubmit={createAiImage} id="adminCreateImgForm">
                <div className="imgPromptDiv">
                    <label htmlFor="imgPromptInp">Prompt</label>
                    <textarea
                        id="imgPromptInp"
                        type="text"
                        placeholder="Describe the image you want..."
                        onChange={(e) => setImagePrompt(e.target.value)}
                        value={imagePrompt}
                        required
                    />
                </div>
                <button type="submit" id="createAiImgBtn" disabled={loading}>
                    {loading ? "Generating..." : "⚡ Generate Image"}
                </button>
            </form>

            <div className="aiImgDiv">
                {loading && (
                    <div className="loaderContainer">
                        <div className="neonLoader"></div>
                        <p>Summoning text to image convertor magic...</p>
                    </div>
                )}

                {!loading && aiImageData?.aiImgurl && (
                    <>
                        <p className="aiImgPrompt">🧠 {aiImageData?.prompt}</p>
                        <img src={aiImageData?.aiImgurl} alt="Generated AI" className="generatedImg" />
                    </>
                )}
            </div>
        </div>
    );
}