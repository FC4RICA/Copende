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
exports.alreadyPlay = void 0;
const Schema_1 = require("../../../Model/Schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config/config");
const alreadyPlay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const { postId } = req.query;
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
        const alreadyPlay = yield Schema_1.PlayModel.exists({ userId: UserID, postId: postId });
        if (!alreadyPlay) {
            res.status(404).json({ message: "User doesn't play this post yet" });
            return;
        }
        const plays = yield Schema_1.PlayModel.find({ userId: UserID, postId: postId });
        const play = yield Schema_1.PlayModel.findOne({ _id: plays });
        if (!play) {
            res.status(404).json({ message: "play not found" });
            return;
        }
        const score = play.score;
        res.status(200).json({ message: "User already play this post", score });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.alreadyPlay = alreadyPlay;
