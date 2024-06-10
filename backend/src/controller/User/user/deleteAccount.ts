import { Request, Response } from "express";
import { UserModel, UserRoleModel } from "../../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_JWT } from "../../../config/config";

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const validToken = jwt.verify(token, String(secret_JWT));
        if (!validToken) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const UserID = (validToken as { userId: any }).userId;

        const user = await UserModel.findById(UserID);
        if (user) {
            await UserRoleModel.deleteMany({ userId: { $in: user._id } });
            await user.deleteOne();
            res.clearCookie("token");
            res.status(200).json({ message: "User Deleted" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
