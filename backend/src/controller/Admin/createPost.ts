import { Request, Response } from "express";
import { PostModel } from "../../Model/Schema";
import jwt from "jsonwebtoken";
import { secret_JWT } from "../../config/config";
import { uploadImagePost } from "../../util/uploadImage";

export const createPost = async (req: Request, res: Response) => {
    try {
        const { base64Image, name, data } = req.body;
        const token = req.cookies.token;
        if (!token) {
            res.json({message: "Unauthorized"});
            return false;
        }

        const validToken = jwt.verify(token,String(secret_JWT));
        if (!validToken) {
            res.json({message: "Unauthorized"});
            return false;
        }

        const imageUrl = await uploadImagePost(base64Image);
        const UserID = (validToken as {userId: any}).userId;

        const post = new PostModel({
            name,
            postImage: imageUrl,
            data,
            userId: UserID,
            create_at: Date.now(),
        });
        await post.save();
        res.status(201).send("Post created successfully!");
    } catch (error:any) {
        console.log(error.message);
    }
};