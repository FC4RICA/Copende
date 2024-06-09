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
exports.playSubmit = void 0;
const Schema_1 = require("../../../Model/Schema");
const Schema_2 = require("../../../Model/Schema");
const Schema_3 = require("../../../Model/Schema");
const compareImg_1 = require("../../../util/compareImg");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config/config");
const playSubmit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const { postId } = req.query;
        const { base64Image, char_num } = req.body;
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
        const post = yield Schema_2.PostModel.findById(postId).populate("postImage").populate("userId");
        const postImage = yield Schema_3.ImageModel.findById(post === null || post === void 0 ? void 0 : post.postImage);
        const imageDiff = yield (0, compareImg_1.compareImg)(base64Image, postImage === null || postImage === void 0 ? void 0 : postImage.name);
        const play = new Schema_1.PlayModel({
            userId: UserID,
            postId: postId,
            score: imageDiff,
            char_num: char_num,
            create_at: Date.now(),
        });
        yield play.save();
        res.status(201).json({ message: "play successfully" });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.playSubmit = playSubmit;
