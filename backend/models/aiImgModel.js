import mongoose from "mongoose";
const aiImgSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    aiImgurl: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
}, {timestamps: true});

const aiImgModel = mongoose.models.aiImage || mongoose.model("aiImage", aiImgSchema);
export default aiImgModel;