import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object, 
        default: {},
    },
}, { minimize: false });

// Correct export statement
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;

