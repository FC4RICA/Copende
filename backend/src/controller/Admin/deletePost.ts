import { Request, Response } from "express";
import { PostModel, ImageModel , PlayModel} from "../../Model/Schema";

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.query;
        const post = await PostModel.findById(postId);
        if (post){
            await ImageModel.deleteMany({_id: {$in: post.postImage}});
            await PlayModel.deleteMany({postId: postId});
            await post.deleteOne();
            res.status(200).json({message:"Post Deleted"});
        }else{
            res.status(404).json({message:"Post Not Found"});
        }
    } catch (error:any) {
        console.log(error.message);
    }
};