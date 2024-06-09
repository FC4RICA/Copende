import { PayloadUser } from "../../../interface/model";
import { Request,Response } from "express";
import { UserModel } from "../../../Model/Schema";
import { comparePassword } from "../../../util/passwordManager";
import jwt from 'jsonwebtoken';
import { secret_JWT } from "../../../config/config";

export const Login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email: email});
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid Password"});
        }

        const payload = jwt.sign({userId: user._id},String(secret_JWT), {algorithm: "HS256"});
        res.cookie("token",payload,{httpOnly : true});
        res.status(200).json({message: "Login Success"});
    } catch (error:any) {
        console.log(error.message);
    }
};