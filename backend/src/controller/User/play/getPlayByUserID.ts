import { Request, Response } from "express";
import { PlayModel } from "../../../Model/Schema";
import jwt from 'jsonwebtoken';
import { secret_JWT } from "../../../config/config";

export const getPlayByUserID = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.json({message: "Unauthorized"});
            return false;
        }

        const validToken = jwt.verify(token,String(secret_JWT));
        if (!validToken) {
            res.json({message: "Unauthorized"});
            return false;
        }

        const UserID = (validToken as {userId: any}).userId;

        const plays = await PlayModel.find({ userId: UserID }).populate({path: 'postId',populate: {path: 'postImage'}});

        if (plays.length > 0) {
            res.status(200).json({ message: "Play data found", plays });
        } else {
            res.status(404).json({ message: "No play data found" });
        }
    } catch (error:any) {
        console.log(error.message);
    }
};