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
exports.createPost = void 0;
const Schema_1 = require("../../Model/Schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const uploadImage_1 = require("../../util/uploadImage");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { base64Image, name, data } = req.body;
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
        const imageUrl = yield (0, uploadImage_1.uploadImagePost)(base64Image);
        const UserID = validToken.userId;
        const post = new Schema_1.PostModel({
            name,
            postImage: imageUrl,
            data,
            userId: UserID,
            create_at: Date.now(),
        });
        yield post.save();
        res.status(201).send("Post created successfully!");
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.createPost = createPost;
