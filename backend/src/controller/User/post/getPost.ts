import { Request, Response } from "express";
import { PostModel } from "../../../Model/Schema";

export const getPost = async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.find().populate("postImage").populate("userId");
        res.status(200).json(posts);
    } catch (error: any) {
        console.log(error.message);
    }
};