import pixelmatch from 'pixelmatch';
import axios from 'axios';
import { PNG } from 'pngjs';
import { decode } from "typescript-base64-arraybuffer";

export const compareImg = async (file: any, imgUrl: any) => {
    const response = await axios.get(imgUrl, { responseType: 'arraybuffer' });
    const referenceImageBuffer = Buffer.from(response.data);

    const binaryData = decode(file.split(",")[1]);

    const referenceImage = PNG.sync.read(referenceImageBuffer);
    const uploadedImage = PNG.sync.read(Buffer.from(binaryData));

    const width = 500;
    const height = 375;

    const diff = new PNG({ width: width, height: height });

    const numDiffPixels = pixelmatch(
        referenceImage.data,
        uploadedImage.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
    );    

    const score = 100 - ((numDiffPixels / (width * height)) * 100);
    return score.toFixed(2);
}