import { Request, Response } from "express";
import { UserModel } from "../../../Model/Schema";
import { UserRoleModel } from "../../../Model/Schema";
import jwt from 'jsonwebtoken';
import { hashPassword } from "../../../util/passwordManager";
import { secret_JWT } from "../../../config/config";
import { GetRoleIDByRole } from "../../../util/Role/GetRoleIDByRole";

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

        const role_id = await GetRoleIDByRole("user");
        const userRole = new UserRoleModel({
            userId: user._id,
            roleId: role_id
        })
        await userRole.save();

        const payload = jwt.sign({userId: user._id}, String(secret_JWT), {algorithm: "HS256"});

        res.cookie("token",payload,{httpOnly : true});
        res.status(200).send({
            message: "User created successfully",
            user,
        });
    } catch (error: any) {
        console.log("Error on register", error.message);
    }
};