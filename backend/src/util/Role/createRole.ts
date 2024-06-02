import { Request, Response } from "express";
import { RoleModel } from "../../Model/Schema";

export const createRole = async (req: Request, res: Response) => {
    try {
        const name = req.body

        const role = new RoleModel(name);
        await role.save();

        res.status(200).send({
            message: "Role created successfully",
            role,
        });
    } catch (error: any) {
        console.log("Error on create Role", error.message);
    }
};