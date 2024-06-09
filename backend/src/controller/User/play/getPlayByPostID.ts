import { Request, Response } from "express";
import { PlayModel } from "../../../Model/Schema";


export const getPlayByPostID = async (req: Request, res: Response) => {
    try {
        const { postId } = req.query;
        const plays = await PlayModel.find({postId: postId}).populate("userId");
        res.status(200).json(plays);
    } catch (error: any) {
        console.log(error.message);
    }
};