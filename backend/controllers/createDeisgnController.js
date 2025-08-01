import OpenAI from "openai";
import ImageModel from "../models/ImageModel.js";
import aiImgModel from "../models/aiImgModel.js";
import cloudinary from "cloudinary";
import fetch from "node-fetch"

const createDesign = async (req, res) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required!" });
    }

    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        const openAiImageUrl = response.data[0]?.url;
        if (!openAiImageUrl) {
            return res.status(500).json({ message: "Image URL not returned from OpenAI." });
        }

        const cloudinaryResponse = await cloudinary.v2.uploader.upload(openAiImageUrl, {
            folder: "openai_images",
        }).catch(err => {
            throw new Error(`Cloudinary upload failed: ${err.message}`);
        });

        const newImage = new ImageModel({
            prompt: prompt,
            imageUrl: cloudinaryResponse.secure_url,
            createdAt: new Date(),
        });
        await newImage.save();

        res.status(200).json({
            message: "Image generated and uploaded successfully!",
            data: { imageUrl: cloudinaryResponse.secure_url },
        });
    } catch (error) {
        console.error("Error in design creation:", error);
        res.status(500).json({ message: "Failed to generate or upload image", error: error.message });
    }
};

// Save design controller
const saveDesign = async (req, res) => {
    const { prompt, imageUrl, name, description, category } = req.body;

    if (!prompt || !imageUrl || !name || !description || !category) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const newImage = new ImageModel({
            prompt,
            imageUrl,
            name,
            description,
            category,
            createdAt: new Date(),
        });

        await newImage.save();

        res.status(200).json({ message: "Design saved successfully!", data: newImage });
    } catch (error) {
        console.error("Error saving design:", error);
        res.status(500).json({ message: "Failed to save design", error: error.message });
    }
};


const getImgs = async (req, res) => {
    try {
        const findedImgs = await ImageModel.find({});
        res.json({ success: true, message: findedImgs });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

const updateImgStatus = async (req, res) => {
    try {
        const { imgId, imgStatus } = req.body;

        const image = await ImageModel.findOne({ _id: imgId });

        if (!image) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        image.imgStatus = imgStatus;

        const updatedImage = await image.save();

        res.json({
            success: true,
            message: "Status updated successfully",
            updatedImg: updatedImage
        });

    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update image status",
            error: error.message
        });
    }
};

const deleteDesign = async (req, res) => {
    try {
        const { imgId } = req.body;
        await ImageModel.findByIdAndDelete(imgId);
        res.json({ success: true, message: "Design Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const singleDesign = async (req, res) => {
    try {
        const { imgId } = req.query;
        const findedImgById = await ImageModel.findById(imgId);
        if (findedImgById) {
            res.json({ success: true, message: findedImgById });
        } else {
            res.json({ success: false, message: "Image not found." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const editDesign = async (req, res) => {
    const { imgId, name, description, category } = req.body;

    if (!imgId || !name || !description || !category) {
        return res.status(400).json({ message: "All fields are required for editing!" });
    }

    try {
        const image = await ImageModel.findById(imgId);

        if (!image) {
            return res.status(404).json({ message: "Image not found!" });
        }

        image.name = name;
        image.description = description;
        image.category = category;

        const updatedImage = await image.save();

        res.status(200).json({
            message: "Design updated successfully!",
            data: updatedImage,
        });
    } catch (error) {
        console.error("Error editing design:", error);
        res.status(500).json({ message: "Failed to edit design", error: error.message });
    }
};



const createImageByAi = async (req, res) => {
    try {
        const { imagePrompt } = req.body;

        if (!imagePrompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        // Updated API endpoint
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: imagePrompt,
                    options: { wait_for_model: true } // Important for larger models
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error("HuggingFace API Error:", error);
            return res.status(500).json({
                success: false,
                message: "Image generation failed",
                error: error
            });
        }

        const imageBuffer = await response.arrayBuffer();
        const base64Image = `data:image/png;base64,${Buffer.from(imageBuffer).toString("base64")}`;

        let createdAiImg = await aiImgModel.create({
            prompt: imagePrompt,
            aiImgurl: base64Image,
        });

        return res.status(200).json({ success: true, createdAiImg });

    } catch (error) {
        console.error("HuggingFace Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const getAllAiImages = async (req, res) => {
    try {
        let allAiImages = await aiImgModel.find();
        if (!allAiImages) {
            return res.json({ success: false, message: "Ai Images not found" });
        }

        res.json({ success: true, allAiImages });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
}


const deleteAiImage = async (req, res) => {
    try {
        const { aiImgId } = req.body;
        if (!aiImgId) {
            return res.json({ success: false, message: "Ai image id is required" });
        }
        await aiImgModel.findByIdAndDelete(aiImgId);
        let allAiImages = await aiImgModel.find();
        if (!allAiImages) {
            return res.json({ success: false, message: "Ai Images not found" });
        }
        res.json({ success: true, message: "Ai Image Deleted Successfully", allAiImages });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal Server Error" });
    }
}

const viewAiImage = async (req, res) => {
    try {
        const { aiImgId } = req.params;
        if (!aiImgId) {
            return res.json({ success: false, message: "Ai image id is required" });
        }

        let singleAiImg = await aiImgModel.findById(aiImgId);
        if (!singleAiImg) {
            return res.json({ success: false, message: "Ai image not found" });
        }
        res.json({ success: true, singleAiImg });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
}

const editAiImage = async (req, res) =>{
    try{
        const {aiImgId, name, description, category} = req.body;
    console.log(aiImgId, name, description, category);
    if (!aiImgId || !name || !description || !category) {
        return res.json({ success: false, message: "All fields are required" });
    }

    let updatedAiImg = await aiImgModel.findByIdAndUpdate(aiImgId, {
        name,
        description,
        category,
    });

    res.json({success: true, message: "Ai image updated Successfully", updatedAiImg});
    }catch(error){
        console.log(error);
        return res.json({success: false, message: "Internal Server Error"});
    }
}

export { createDesign, getImgs, updateImgStatus, deleteDesign, singleDesign, editDesign, saveDesign, createImageByAi, getAllAiImages, deleteAiImage, viewAiImage, editAiImage };