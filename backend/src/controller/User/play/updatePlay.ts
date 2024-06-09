import { Request, Response } from "express";
import { PlayModel } from "../../../Model/Schema";
import { PostModel } from "../../../Model/Schema";
import { ImageModel } from "../../../Model/Schema";
import { compareImg } from "../../../util/compareImg";
import jwt from 'jsonwebtoken';
import { secret_JWT } from "../../../config/config";

export const updatePlay = async (req: Request, res: Response) => {
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
        
        const newImageDiff = await compareImg(base64Image,postImage?.name);
        
        const plays = await PlayModel.find({userId: UserID, postId: postId});
        const play = await PlayModel.findOne({_id: plays});
        if (!play) {
            res.status(404).json({message: "play not found"});
            return;
        }

        if (!newImageDiff) {
            res.status(400).json({message: "score not defined"});
            return;
        }

        if (parseFloat(newImageDiff) >= play?.score){
            play.score = parseFloat(newImageDiff);
            play.char_num = char_num;
            await play.save();
            res.status(200).json({message: "update play successfully"});
        } else {
            res.status(400).json({message: "score belower than previous score"});
        }
    } catch (error: any) {
        console.log(error.message);
    }
};