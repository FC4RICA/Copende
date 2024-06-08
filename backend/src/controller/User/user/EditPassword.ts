import { Request, Response } from "express";
import { UserModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_JWT } from "../../../config/config";
import { hashPassword, comparePassword } from "../../../util/passwordManager";

export const editPassword = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const {
            oldPassword,
            newPassword,
            confirmPassword,
        } = req.body;

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
        const user = await UserModel.findOne({_id: UserID});
        if (!user) {
            res.status(400).json({message: "user not found!"});
            return false;
        }

        const isPasswordValid = await comparePassword(oldPassword,user.password);

        if (!isPasswordValid) {
            res.status(400).json({message: "Invalid Password"});
            return false;
        }

        if (newPassword === oldPassword) {
            res.status(400).json({message: "Password is the same"});
            return false;
        }

        if (newPassword !== confirmPassword) {
            res.status(400).json({message: "Password doesn't match"});
            return false;
        }

        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        
        res.status(200).json({message: "user updated successfully"})
    } catch (error:any) {
        console.log(error.message);
    }
};