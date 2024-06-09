/*import { Request, Response } from "express";
import { PlayModel } from "../../../Model/Schema";
import jwt from 'jsonwebtoken';
import { secret_JWT } from "../../../config/config";

export const alreadyPlay = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const { postId } = req.query; 

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

        const alreadyPlay = await PlayModel.exists({userId: UserID, postId: postId});
        if (alreadyPlay) 

    } catch (error: any) {
        console.log(error.message);
    }
};*/