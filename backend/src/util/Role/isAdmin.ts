import { Request, Response } from "express";
import { UserRoleModel } from "../../Model/Schema";
import { RoleModel } from "../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_JWT } from "../../config/config";

// Still need to adjust the query code using populate
export const isAdmin = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.json({ message: "Unauthorized" });
      return false;
    }

    const validToken = jwt.verify(token, String(secret_JWT));
    if (!validToken) {
      res.json({ message: "Unauthorized" });
      return false;
    }

    const userID = (validToken as { userId: any }).userId;

    const userRole = await UserRoleModel.find({ userId: userID });
    if (!userRole) {
      res.json({ message: "User not found in UserRole table" });
      return false;
    }

    const roleIds = userRole.map((userRole) => userRole.roleId);

    const hasAdminRole = await RoleModel.find({_id: { $in: roleIds },name: "admin",});

    if (hasAdminRole.length > 0) {
        res.status(200).json({message: "This user is admin"});
        return true;
    }
    res.status(401).json({message: "This user is not admin"});
    return false;
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error.message);
  }
};