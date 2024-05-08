import { Request, Response } from "express";
import { UserModel } from "../../Model/Schema";
import jwt from 'jsonwebtoken';
import { hashPassword } from "../../util/passwordManager";
import { secret_JWT } from "../../config/config";

export const register = async (req: Request, res: Response) => {
    try {
        const {
            username,
            password,
            email,
        } = req.body
        
        const user = new UserModel({
            username,
            password : await hashPassword(password),
            email,
            create_at : Date.now(),
        });
        await user.save();

        const payload = jwt.sign({UserID: user._id}, String(secret_JWT), {algorithm: "HS256"});

        res.cookie("token",payload,{httpOnly : true});
        res.status(200).send({
            message: "User created successfully",
            user,
        });
    } catch (error: any) {
        console.log("Error on register", error.message);
    }
};