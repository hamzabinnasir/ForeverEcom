import express from "express"
import { createDesign, getImgs, updateImgStatus, deleteDesign, singleDesign, editDesign, saveDesign,createImageByAi, getAllAiImages, deleteAiImage, viewAiImage, editAiImage } from "../controllers/createDeisgnController.js";
const createRouter = express.Router();

createRouter.post("/generate-image", createDesign);
createRouter.get("/get-image", getImgs);
createRouter.post("/updateImgStatus", updateImgStatus);
createRouter.post("/deleteDesign", deleteDesign);
createRouter.get("/getSingleDesign", singleDesign);
createRouter.get("/getSingleDesign/:imgId", singleDesign);
createRouter.post("/save-design", saveDesign);
createRouter.post("/edit-design", editDesign);
// __________________________________________________________
createRouter.post("/createAiImg", createImageByAi);
createRouter.get("/allAiImgs", getAllAiImages);
createRouter.post("/deleteAiImg", deleteAiImage);
createRouter.get("/viewAaiImg/:aiImgId", viewAiImage);
createRouter.post("/editAiImg", editAiImage);
export default createRouter;