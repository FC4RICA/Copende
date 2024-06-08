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
exports.editPassword = void 0;
const Schema_1 = require("../../../Model/Schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config/config");
const passwordManager_1 = require("../../../util/passwordManager");
const editPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const { oldPassword, newPassword, confirmPassword, } = req.body;
        if (!token) {
            res.json({ message: "Unauthorized" });
            return false;
        }
        const validToken = jsonwebtoken_1.default.verify(token, String(config_1.secret_JWT));
        if (!validToken) {
            res.json({ message: "Unauthorized" });
            return false;
        }
        const UserID = validToken.userId;
        const user = yield Schema_1.UserModel.findOne({ _id: UserID });
        if (!user) {
            res.status(400).json({ message: "user not found!" });
            return false;
        }
        const isPasswordValid = yield (0, passwordManager_1.comparePassword)(oldPassword, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Password" });
            return false;
        }
        if (newPassword === oldPassword) {
            res.status(400).json({ message: "Password is the same" });
            return false;
        }
        if (newPassword !== confirmPassword) {
            res.status(400).json({ message: "Password doesn't match" });
            return false;
        }
        const hashedPassword = yield (0, passwordManager_1.hashPassword)(newPassword);
        user.password = hashedPassword;
        yield user.save();
        res.status(200).json({ message: "user updated successfully" });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.editPassword = editPassword;
