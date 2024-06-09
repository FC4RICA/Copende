import { Request,Response } from "express";
import { RoleModel } from "../../Model/Schema";

export const getRole = async (req: Request, res: Response) => {
    try {
        const role = await RoleModel.find({});
        res.status(200).json(role);
    } catch (error:any) {
        console.log(error.message);
    }
};