import { Request,Response } from "express";
import { UserModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_JWT } from "../../../config/config";

export const getUserByUserID = async (req: Request,res: Response) => {
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

        const user = await UserModel.findById(UserID);
        if (!user) {
            res.json({message: "User not found"});
            return false;
        }

        const { username, email , create_at} = user;
        res.status(200).json({ username, email , create_at});
    } catch (error:any) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(error.message);
    }
};