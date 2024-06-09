import { Request, Response } from "express";
import { PostModel } from "../../../Model/Schema";
import { ImageModel } from "../../../Model/Schema";
import { compareImg } from "../../../util/compareImg";

export const guestPlaySubmit = async (req: Request, res: Response) => {
    try {
        const { postId } = req.query;
        const { base64Image } = req.body;

        const post = await PostModel.findById(postId).populate("postImage");
        const postImage = await ImageModel.findById(post?.postImage);
        
        const imageDiff = await compareImg(base64Image,postImage?.name);

        res.status(200).json({message: `Score of differing pixels: ${imageDiff}%`});
    } catch (error: any) {
        console.log(error.message);
    }
};