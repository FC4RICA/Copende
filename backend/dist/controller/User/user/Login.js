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
exports.Login = void 0;
const Schema_1 = require("../../../Model/Schema");
const passwordManager_1 = require("../../../util/passwordManager");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config/config");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Schema_1.UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = yield (0, passwordManager_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const payload = jsonwebtoken_1.default.sign({ userId: user._id }, String(config_1.secret_JWT), { algorithm: "HS256" });
        res.cookie("token", payload, { httpOnly: true });
        res.status(200).json({ message: "Login Success", payload: payload });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.Login = Login;
