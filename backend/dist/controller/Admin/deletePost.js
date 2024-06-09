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
exports.deletePost = void 0;
const Schema_1 = require("../../Model/Schema");
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.query;
        const post = yield Schema_1.PostModel.findById(postId);
        if (post) {
            yield Schema_1.ImageModel.deleteMany({ _id: { $in: post.postImage } });
            yield post.deleteOne();
            res.status(200).json({ message: "Post Deleted" });
        }
        else {
            res.status(404).json({ message: "Post Not Found" });
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.deletePost = deletePost;
