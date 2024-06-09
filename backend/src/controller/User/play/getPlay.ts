import { Request, Response } from "express";
import { PlayModel } from "../../../Model/Schema";

export const getPlay = async (req: Request, res: Response) => {
    try {
        const plays = await PlayModel.find().populate("userId").populate({path: "postId", populate:{path: "postImage"}});
        res.status(200).json(plays);
    } catch (error: any) {
        console.log(error.message);
    }
};