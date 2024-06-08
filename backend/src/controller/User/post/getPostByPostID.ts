import { Request, Response } from "express";
import { PostModel } from "../../../Model/Schema";

export const getPostByPostID = async (req: Request, res: Response) => {
    try {
        const { postId } = req.query
        const posts = await PostModel.findById(postId).populate("postImage").populate("userId");
        res.status(200).json(posts);
    } catch (error: any) {
        console.log(error.message);
    }
};