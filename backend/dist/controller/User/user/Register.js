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
exports.register = void 0;
const Schema_1 = require("../../../Model/Schema");
const Schema_2 = require("../../../Model/Schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passwordManager_1 = require("../../../util/passwordManager");
const config_1 = require("../../../config/config");
const GetRoleIDByRole_1 = require("../../../util/Role/GetRoleIDByRole");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, } = req.body;
        const existingEmail = yield Schema_1.UserModel.findOne({ email: email });
        const existingUsername = yield Schema_1.UserModel.findOne({ username: username });
        if (existingEmail || existingUsername) {
            return res.status(409).send({
                message: "Email or Username is already in use. Please use a different email or username."
            });
        }
        const user = new Schema_1.UserModel({
            username,
            password: yield (0, passwordManager_1.hashPassword)(password),
            email,
            create_at: Date.now(),
        });
        yield user.save();
        const role_id = yield (0, GetRoleIDByRole_1.GetRoleIDByRole)("user");
        const userRole = new Schema_2.UserRoleModel({
            userId: user._id,
            roleId: role_id
        });
        yield userRole.save();
        const payload = jsonwebtoken_1.default.sign({ userId: user._id }, String(config_1.secret_JWT), { algorithm: "HS256" });
        res.cookie("token", payload, { httpOnly: true });
        res.status(200).send({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        console.log("Error on register", error.message);
    }
});
exports.register = register;
