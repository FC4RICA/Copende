import { Request, Response } from "express";
import { UserModel, UserRoleModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_JWT } from "../../../config/config";

export const deleteAccount = async (req: Request, res: Response) => {
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
        if (user){
            await UserRoleModel.deleteMany({userId: {$in: user._id}})
            await user.deleteOne();
            res.clearCookie(token);
            res.status(200).json({message:"User Deleted"});
            return;
        }else{
            res.status(404).json({message:"User Not Found"});
        }
    } catch (error:any) {
        console.log(error.message);
    }
};