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
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestPlaySubmit = void 0;
const Schema_1 = require("../../../Model/Schema");
const Schema_2 = require("../../../Model/Schema");
const compareImg_1 = require("../../../util/compareImg");
const guestPlaySubmit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.query;
        const { base64Image } = req.body;
        const post = yield Schema_1.PostModel.findById(postId).populate("postImage");
        const postImage = yield Schema_2.ImageModel.findById(post === null || post === void 0 ? void 0 : post.postImage);
        const imageDiff = yield (0, compareImg_1.compareImg)(base64Image, postImage === null || postImage === void 0 ? void 0 : postImage.name);
        res.status(200).json({ message: `Score of differing pixels: ${imageDiff}%` });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.guestPlaySubmit = guestPlaySubmit;
