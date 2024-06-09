import { Request, Response } from "express";
import { UserModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_JWT } from "../../../config/config";

export const editUsername = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const {newUsername} = req.body;

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
        
        const user = await UserModel.findByIdAndUpdate(UserID, {username: newUsername});
        if (!user) {
            res.status(400).json({message: "user not found!"});
        }
        res.status(200).json({message: "user updated successfully"})
    } catch (error:any) {
        console.log(error.message);
    }
};