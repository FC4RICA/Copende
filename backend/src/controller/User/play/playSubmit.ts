import { Request, Response } from "express";
import { PlayModel } from "../../../Model/Schema";
import { compareImg } from "../../../util/compareImg";

export const playSubmit = async (req: Request, res: Response) => {
    try {
        const { base64Image, imgUrl } = req.body;
        const imageDiff = await compareImg(base64Image,imgUrl);

        res.json({message: `Number of differing pixels: ${imageDiff}`})
    } catch (error: any) {
        console.log(error.message);
    }
};