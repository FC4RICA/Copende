"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const Schema_1 = require("../../Model/Schema");
const Schema_2 = require("../../Model/Schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const isAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.json({ message: "Unauthorized" });
            return false;
        }
        const validToken = jsonwebtoken_1.default.verify(token, String(config_1.secret_JWT));
        if (!validToken) {
            res.json({ message: "Unauthorized" });
            return false;
        }
        const userID = validToken.userId;
        const userRole = yield Schema_1.UserRoleModel.find({ userId: userID });
        if (!userRole) {
            res.json({ message: "User not found in UserRole table" });
            return false;
        }
        const roleIds = userRole.map((userRole) => userRole.roleId);
        const hasAdminRole = yield Schema_2.RoleModel.find({ _id: { $in: roleIds }, name: "admin", });
        if (hasAdminRole.length > 0) {
            res.status(200).json({ message: "This user is admin" });
            return true;
        }
        res.status(401).json({ message: "This user is not admin" });
        return false;
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error.message);
    }
});
exports.isAdmin = isAdmin;
