import { RoleModel } from "../../Model/Schema";

export const GetRoleIDByRole = async (roleName: String) => {
    try {
        const role = await RoleModel.findOne({ name: roleName });
        return role?._id;
    } catch (error: any) {
        console.log(error.message);
    }
};