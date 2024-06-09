import { Request, Response } from "express";
import { PlayModel } from "../../../Model/Schema";
import { PostModel } from "../../../Model/Schema";
import { ImageModel } from "../../../Model/Schema";
import { compareImg } from "../../../util/compareImg";
import jwt from 'jsonwebtoken';
import { secret_JWT } from "../../../config/config";


export const playSubmit = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const { postId } = req.query;
        const { base64Image, char_num } = req.body;

        if (!token) {
            res.json({message: "Unauthorized"});
            return false;
        }

        const validToken = jwt.verify(token,String(secret_JWT));
        if (!validToken) {
            res.json({message: "Unauthorized"});
            return false;
        }

        const UserID = (validToken as {userId: any}).userId;

        const post = await PostModel.findById(postId).populate("postImage").populate("userId");
        const postImage = await ImageModel.findById(post?.postImage);
        
        const imageDiff = await compareImg(base64Image,postImage?.name);

        const play = new PlayModel({
            userId: UserID,
            postId: postId,
            score: imageDiff,
            char_num: char_num,
            create_at: Date.now(),
        })
        await play.save();

        res.status(201).json({message: "play successfully", imageDiff});
    } catch (error: any) {
        console.log(error.message);
    }
};